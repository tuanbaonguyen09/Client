import { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {deviceIndexToNameMapping} from '../../../utils/Mapping'
import { updateFertilizers } from '../../../redux/Crop/Slice'
import { fetchControllerInfo, publishControllerInfo } from '../../../redux/Adafruit/Slice'

import { addControllerInfoToBlockChain, updateSignal } from '../../../redux/Controller/Slice'
import { pushControllerInfo } from '../../../redux/History/History'
import {resetAll} from '../../../redux/History/History'

import RegionPump from '../../../assets/Dashboard/Device/Region.png'
import NutritionMixing from '../../../assets/Dashboard/Device/Nutritious.png'
import MainPump from '../../../assets/Dashboard/Device/MainPump.png'
import Switch from '../../UI/Switch/Switch'


const Device = ({device}) => {
    const nameOfDevice = deviceIndexToNameMapping[device.index]
    const deviceGroup1 = device.index == 1 || device.index == 2 || device.index == 3
    const deviceGroup2 = device.index == 4 || device.index == 5 || device.index == 6

    const dispatch = useDispatch()
    const isConnected = useSelector((state) => state.login.isConnected)
    const controllerSignals = useSelector((state) => state.controller.controllerSignals)
    const controllers = useSelector((state) => state.history.controllersInfo)
    const controllersCount = useSelector((state) => state.history.controllersCount)


    const feedName = `relays.relay${device.index}`
    useEffect(() => {
        dispatch(fetchControllerInfo({device,feedName}))
    }, [])

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
            // addControllersInfoToBlockchain(controllers)
            dispatch(updateFertilizers(arrayFertilizers))
            dispatch(addControllerInfoToBlockChain())
            dispatch(resetAll())
        }
        //Publish NOW
        dispatch(pushControllerInfo(controller))
        dispatch(updateSignal([device.index, nextChecked]))
        console.log(controllerSignals)
        // publish to adafruit
        const feedName = `relays.relay${device.index}`
        const value = Number(nextChecked)
        dispatch(publishControllerInfo({feedName,value}))
    }

    const deviceStatus = controllerSignals[device.index - 1] == 1

    return (
        <>
            <div className='
            absolute w-full h-full
            flex gap-3 items-center justify-center
            bg-white rounded-lg px-3 py-1'>
                {deviceGroup1 ? (
                        <img className='max-w-[72px]' src={NutritionMixing} />
                    ) : deviceGroup2 ? (
                        <img className='max-w-[72px]' src={RegionPump} />
                    ) : (
                        <img className='max-w-[72px]' src={MainPump} />
                    )}
                <div className='h-full flex flex-col justify-evenly'>
                    <p className='font-semibold text-sm'>{nameOfDevice}</p>
                    <Switch
                        onChange={handleChange}
                        isEnabled={isConnected}
                        checked={deviceStatus}
                    />
                </div>
            </div>
        </>
    )
}

export default Device
