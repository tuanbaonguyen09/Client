import { useParams } from "react-router-dom"
import { getCropInfo } from "../../redux/Crop/Slice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Crop from "./Crop"
import CropDetailsIMG from '../../assets/Display/cropdetails.png'
import { getAllControllersInfo } from "../../redux/Controller/Slice"
import CustomTable from "../../components/UI/Table/CustomTable"
import CustomSlider from "../../components/UI/Slider/CustomSlider"
import { getAllSensorsData } from "../../redux/Sensor/Slice"
const CropDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    
    const cropID = params.cropID
    const controllersInfo = useSelector(state => state.controller.controllersInfo)
    const sensorsData = useSelector(state => state.sensor.sensorsData)
    const cropInfo = useSelector(state => state.crop.singleCropInfo)
    //add history care of this crop
    const [plantingDateTime, setPlantingDateTime] = useState(null);
    const [harvestDateTime, setHarvestDateTime] = useState(null);

    const [cropCareHistory, setCropCareHistory] = useState([])
    const [cropSensorHistory, setCropSensorHistory] = useState([])

    //custom function

    useEffect(()=> {
        dispatch(getAllControllersInfo())
        dispatch(getCropInfo(cropID))
        dispatch(getAllSensorsData())
    },[dispatch, cropID])

    useEffect(()=> {
        const convertToDateTime = (dateString) => {
            const [datePart, timePart] = dateString.split(', ')
            const [month, day, year] = datePart.split('/')
            const [time, meridian] = timePart.split(' ')
            let [hours, minutes, seconds] = time.split(':')
    
            if (meridian === 'PM' && hours !== '12') {
                hours = String(parseInt(hours, 10) + 12)
            } else if (meridian === 'AM' && hours === '12') {
                hours = '00'
            }
    
            // Adjust month by subtracting 1 for JavaScript's zero-based indexing
            const adjustedMonth = parseInt(month, 10) - 1
    
            return new Date(year, adjustedMonth, day, hours, minutes, seconds)
        }
        if (cropInfo) {
            // Check if plantingDate and actualHarvestDate are available
            if (cropInfo.plantingDate && cropInfo.actualHarvestDate) {
              setPlantingDateTime(convertToDateTime(cropInfo.plantingDate));
              setHarvestDateTime(convertToDateTime(cropInfo.actualHarvestDate));
            }
          }
        for (let i = 0; i < controllersInfo.length; i++) {
            const controllerDateTime = convertToDateTime(controllersInfo[i].createAt)
            if (
                controllerDateTime >= plantingDateTime &&
                controllerDateTime <= harvestDateTime
            ) {
                setCropCareHistory(prev => [...prev, controllersInfo[i]])
                console.log(cropCareHistory)
            }
        }
        for (let i = 0; i < sensorsData.length; i++) {
            const sensorDateTime = convertToDateTime(sensorsData[i].createAt)
            if (sensorDateTime >= plantingDateTime && sensorDateTime <= harvestDateTime) {
                setCropSensorHistory(prev => [...prev, sensorsData[i]])
                console.log(cropSensorHistory)
            }
        }
    },[cropInfo])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipe: true,
    }

    return (
        <div className='absolute
        w-full h-full left-0 p-[inherit] py-12'>
            <div className="flex flex-col justify-center h-full w-full px-2 py-6 gap-4 rounded-xl bg-white shadow-crop-display">
                <div className="flex gap-4">
                    <div className="w-full flex justify-center px-12 gap-8 items-center">
                        <img src={CropDetailsIMG} className="w-full max-w-[60%]" />
                        <div className="w-full text-4xl font-bold font-mono text-primary-400">
                            Crop Details
                        </div>
                    </div>
                </div>  
                <div className="flex flex-col w-full p-2" >
                    <div className='flex items-center justify-between '> 
                        <div className='font-bold items-baseline text-3xl text-primary-700 gap-2'>
                            {cropInfo.cropType}
                        </div>
                        <span className='justify-self-end font-light text-sm font-mono text-primary-500'>
                            {cropInfo.plantingDate.split(',')[0]}   
                        </span>
                    </div>
                    <div className='font-mono pl-2 text-main-300'>
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>No.months to harvest: </p>
                            <span className="text-yellow-600">{parseInt(cropInfo.harvestDate)}</span>
                        </div>
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>Fertilizers: </p>
                            <span className="text-yellow-600">{cropInfo.fertilizers || 'None'}</span>
                        </div>
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>Pesticides: </p>
                            <span className="text-yellow-600">{cropInfo.pesticides || 'None'}</span>
                        </div>
        
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>Diseases: </p>
                            <span className="text-yellow-600">{cropInfo.diseases || 'None'}</span>
                        </div>
        
                        <div className='flex jutify-center items-center font-semibold '>
                            <p>Additional information:</p>
                            <span className="text-yellow-600">{cropInfo.additionalInfo || 'None'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-2">
                    <p className="font-bold text-lg text-main-300">Controller History</p>
                    <CustomSlider setting={settings}>
                        {
                            cropCareHistory.map((controller, index) => 
                                <CustomTable key={index} type='controller' data={controller} />
                            )
                        }
                        
                    </CustomSlider>
                </div>

                <div className="flex flex-col gap-2 px-2">
                    <p className="font-bold text-lg text-main-300">Sensor History</p>
                    <CustomSlider setting={settings}>
                        {
                            cropSensorHistory.map((sensor, index) => 
                                <CustomTable key={index} type='sensor' data={sensor} />
                            )
                        }
                        
                    </CustomSlider>
                </div>

            </div>
        </div>  
    )
}

export default CropDetails