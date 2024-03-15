import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {deviceIndexToNameMapping} from '../../../utils/Mapping'

import { ControllerContext } from '../../../context/ControllerContext'
import { AdafruitContext } from '../../../context/AdafruitContext'

import { updateSignal } from '../../../redux/Controller/Slice'
import { pushControllerInfo } from '../../../redux/History/History'
import { resetAll } from '../../../redux/History/History'

import RegionPump from '../../../assets/Dashboard/Device/Region.png'
import NutritionMixing from '../../../assets/Dashboard/Device/Nutritious.png'
import MainPump from '../../../assets/Dashboard/Device/MainPump.png'
import Switch from '../Switch/Switch'

const Device = ({device}) => {
    const nameOfDevice = deviceIndexToNameMapping[device.index]
    const deviceGroup1 = device.index == 1 || device.index == 2 || device.index == 3
    const deviceGroup2 = device.index == 4 || device.index == 5 || device.index == 6

    const dispatch = useDispatch()
    const [isEnabled, setIsEnabled] = useState(false)

    const { addControllersInfoToBlockchain } = useContext(ControllerContext)
    const { fetchControllerInfo, publishControllerInfo } = useContext(AdafruitContext)

    const currentAccount = useSelector((state) => state.login.currentAccount)
    const controllerSignals = useSelector((state) => state.controller.controllerSignals)
    const controllers = useSelector((state) => state.history.controllersInfo)
    const controllersCount = useSelector((state) => state.history.controllersCount)

    useEffect(() => {
        setIsEnabled(currentAccount === '0x0d22c5b0dbd93aeb3ba644218363d5282b40fb5e')
        const fetchData = async () => {
            const response = await fetchControllerInfo(`relays.relay${device.index}`)
            dispatch(updateSignal([device.index, parseInt(response.data.value)]))
        }
        fetchData()
    }, [currentAccount])

    const handleChange = async (nextChecked) => {
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }
        const vietnamTime = new Date().toLocaleString('en-US', options)

        const controller = {
            deviceName: nameOfDevice,
            createAt: vietnamTime,
            value: nextChecked ? 1 : 0,
        }

        if (controllersCount === 10) {
            const arrayFertilizers = []
            for (let i = 0; i < controllers.length; i++) {
                if (
                    controllers[i].deviceName === 'Nutritious Liquid 1' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('N')) arrayFertilizers.push('N')
                } else if (
                    controllers[i].deviceName === 'Nutritious Liquid 2' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('P')) arrayFertilizers.push('P')
                } else if (
                    controllers[i].deviceName === 'Nutritious Liquid 3' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('K')) arrayFertilizers.push('K')
                }
            }
            console.log(arrayFertilizers)
            // updateFertilizers(arrayFertilizers)
            addControllersInfoToBlockchain(controllers)
            dispatch(resetAll())
        }

        dispatch(pushControllerInfo(controller))
        dispatch(updateSignal([device.index, nextChecked]))

        // publish to adafruit
        publishControllerInfo(`relays.relay${device.index}`, Number(nextChecked))
    }

    const deviceStatus = controllerSignals[device.index - 1] == 1

    return (
        <>
            <div className='
            flex gap-2 items-center justify-between
            bg-white rounded-2xl px-4 py-2'>
                {deviceGroup1 ? (
                        <img className='max-w-16' src={NutritionMixing} />
                    ) : deviceGroup2 ? (
                        <img className='max-w-16' src={RegionPump} />
                    ) : (
                        <img className='max-w-16' src={MainPump} />
                    )}
                <p className='font-sans font-semibold'>This is device name</p>
                <Switch
                    onChange={handleChange}
                    isEnabled={isEnabled}
                    checked={deviceStatus}
                />
            </div>
        </>
    )
}

export default Device
