import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { feedKeyMapping, unitMapping } from '../../../utils/Mapping'
import { useEffect, useState } from 'react'
import { fetchSensorData, fetchSensorData2 } from '../../../redux/Adafruit/Slice'

import {useDispatch, useSelector} from 'react-redux'
import { setSensorActiveID } from '../../../redux/Dashboard/Dashboard'

const Sensor = ({input}) => {
    const dispatch = useDispatch()
    const [sensorValue, setSensorValue] = useState(0)
    const waterSensorType = feedKeyMapping[input.id].startsWith('water')
    const airSensorType = feedKeyMapping[input.id].startsWith('air')
    
    const activeID = useSelector(state => state.dashboard.sensorActiveID)

    //UI element active or not
    const sensorActive =  activeID === input.id
    const onClickHandler = () => {
        dispatch(setSensorActiveID(input.id))
        // input.setStatus((prev) => ({ ...prev, sensorID: input.id }))
    }
    
    // subscribe and get data from adafruit
    useEffect(() => {
        const fetchData = async () => {
            const sensorIndex = input.id
            if (
                feedKeyMapping[sensorIndex].startsWith('water') ||
                feedKeyMapping[sensorIndex].startsWith('air')
            ) {
                const feedName = feedKeyMapping[sensorIndex]
                const response = await dispatch(fetchSensorData2({feedName}))
                const data = response.payload
                setTimeout(() => {
                    //just in case user switches between sensors quickly
                    setSensorValue(data)
                })
            } else {
                const feedName = feedKeyMapping[sensorIndex]
                const response =  await dispatch(fetchSensorData({feedName}))
                const data = response.payload
                setTimeout(() => {
                    //just in case user switches between sensors quickly
                    setSensorValue(data)
                })
            }
        }
        fetchData() //the first time

        const myInterval = setInterval(fetchData, 5000)
        return () => {
            clearInterval(myInterval)
        }
    }, [])

    const sensorType = {
        air: {
            background : "bg-neutral-400",
            icon  :"fa-wind",
            text: "text-neutral-400"
        },
        water: {
            background : "bg-blue-300",
            icon  :"fa-water",
            text: "text-blue-300"
        },
        earth: {
            background : "bg-yellow-700",
            icon : "fa-seedling",
            text: "text-yellow-700"

        }

    }

    return( 
        <div 
        onClick={onClickHandler}
        className={` outline-none
        absolute w-full h-full flex gap-8 items-center justify-evenly rounded-lg px-6 py-1 
        ${sensorActive ? 
            airSensorType ? sensorType.air.background
            : waterSensorType ? sensorType.water.background
            : sensorType.earth.background
            : "bg-white"
        }`
        
        }>
                <FontAwesomeIcon 
                    icon={`fa-solid ${airSensorType ? 
                        sensorType.air.icon 
                        : waterSensorType ? sensorType.water.icon 
                        : sensorType.earth.icon
                    }`}
                    className={`text-8xl ${sensorActive ? 'text-white' 
                    : airSensorType ? sensorType.air.text
                        : waterSensorType ? sensorType.water.text
                        : sensorType.earth.text
                    }`}/>
                    <div className="h-full flex flex-col justify-center">
                        <p className={`font-bold w-full text-2xl
                            ${sensorActive ? 'text-white' 
                            : airSensorType ? sensorType.air.text
                            : waterSensorType ? sensorType.water.text
                            : sensorType.earth.text
                            }
                        `}>
                            {input.name}
                        </p>
                        <p className={`font-mono 
                            ${sensorActive ? 
                            'text-white' 
                            : input.status ? 'text-green-400': 'text-red-400'}`}>
                            {input.status ? 'active' : 'inactive'}
                        </p>
                        <p className={`font-bold text-4xl 
                            ${sensorActive ? 'text-white' 
                                : airSensorType ? sensorType.air.text
                                : waterSensorType ? sensorType.water.text
                                : sensorType.earth.text
                            }
                        `}>
                            {sensorValue}
                            <span>{unitMapping[input.id]}</span>
                        </p>
                    </div>
        </div>
    )
}

export default Sensor