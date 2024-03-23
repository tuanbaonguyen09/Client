import CustomSlider from "../../UI/Slider/CustomSlider"
import Sensor from "./Sensor"
import { useState } from "react"
import {  useSelector } from 'react-redux'

const SensorList = () => {
    const [active, setIsActive] = useState({
        sensorID: -1,
    })

    const dummySensorList = [
        //for rendering UI
        {
            name: 'Temperature',
            label: 'soil',
            status: true,
        },
        {
            name: 'Humidity',
            label: 'soil',
            status: true,
        },
        {
            name: 'pH',
            label: 'soil',
            status: true,
        },
        {
            name: 'EC',
            label: 'soil',
            status: true,
        },
        {
            name: 'N',
            label: 'soil',
            status: true,
        },
        {
            name: 'P',
            label: 'soil',
            status: true,
        },
        {
            name: 'K',
            label: 'soil',
            status: true,
        },

        {
            name: 'Temperature',
            label: 'air',
            status: true,
        },
        {
            name: 'Humidity',
            label: 'air',
            status: true,
        },
        {
            name: 'Light',
            label: 'air',
            status: true,
        },
        {
            name: 'CO2',
            label: 'air',
            status: true,
        },
        {
            name: 'Temperature',
            label: 'water',
            status: true,
        },
        {
            name: 'PH',
            label: 'water',
            status: true,
        },
        {
            name: 'EC',
            label: 'water',
            status: true,
        },
        {
            name: 'ORP',
            label: 'water',
            status: true,
        },
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipe: true,
        adaptiveHeight: true,
    }

    return(
        <div className="absolute w-full h-full">
            <CustomSlider setting={settings}>
                {dummySensorList.map((item, index) => (
                    <Sensor
                        key={index}
                        input={{
                            name: item.name,
                            label: item.label,
                            status: item.status,
                            id: index,
                        }}
                    />
                ))}
            </CustomSlider>
        </div>

    )
}

export default SensorList