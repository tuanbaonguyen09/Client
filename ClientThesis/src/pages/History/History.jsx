import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPaginate from 'react-paginate'


// import XLSX from 'xlsx'
import { controllerAddress } from '../../constant'
import { sensorDataAddress } from '../../constant'
import { NameToUnitMapping } from '../../utils/Mapping'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState} from 'react'
import { getAllControllersInfo } from '../../redux/Controller/Slice'
import { getAllSensorsData } from '../../redux/Sensor/Slice'
import { useParams } from 'react-router-dom'
import { sensorType as sensorStyle } from '../../components/Interface/Sensors/Sensor'

const History = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const deviceType = params.deviceType

    useEffect(() => {
        deviceType === "controller" ? dispatch(getAllControllersInfo()) : dispatch(getAllSensorsData())
    },[deviceType, dispatch])

    const controllersInfo = useSelector(state => state.controller.controllersInfo)
    const sensorsData = useSelector(state => state.sensor.sensorsData)
    const reversedControllerInfo = [...controllersInfo].reverse()


    console.log(sensorsData)
    const contractAddressUrl = `https://sepolia.etherscan.io/address/${controllerAddress}`
    const sensorAddressUrl = `https://sepolia.etherscan.io/address/${sensorDataAddress}`

    const handleExportControllerInfoToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(reversedControllerInfo)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ControllerInfo')
        XLSX.writeFile(workbook, 'ControllerInfo.xlsx')
    }

    const handleExportSensorsDataToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(sortedSensorsData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SensorData')
        XLSX.writeFile(workbook, 'SensorData.xlsx')
    }

    const RenderItem = ({currrentItems}) => {
        return(
            <>
            {currrentItems && currrentItems.map((item, index) => (
                <>
                    {
                        deviceType === "controller" ? <ControllerItem index={index} key={index} controller={item}/>
                        : <SensorItem index={index} key={index} sensor={item} />
                    }
                </>
            ))}
        </>)

    }

    const PaginatedItems = ({ itemsPerPage, items }) =>  {
        const [itemOffset, setItemOffset] = useState(0);

        const endOffset = itemOffset + itemsPerPage;
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);
      
        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % items.length;
          setItemOffset(newOffset);
        };

        return (
            <>
                <RenderItem currrentItems={currentItems}/>
                <ReactPaginate
                    className='flex self-start gap-1 bg-main-100 p-2 rounded-lg text-sm mt-2 text-main-600'
                    pageClassName='px-1.5 rounded-full'
                    activeClassName='bg-main-300 text-white'
                    breakLabel="..."

                    previousLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                    previousClassName="flex justify-center items-center px-0.5 rounded-full"
                    previousLinkClassName="text-main-400 h-fit"

                    nextLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-right "/>
                    nextClassName="flex justify-center items-center px-0.5 rounded-full"
                    nextLinkClassName="text-main-400 h-fit"

                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                />    
            </>
        )
    }

    const ControllerItem = ({controller, index}) => {
        const signal = controller.value === 1 ? 'on' : 'off'
        // let historyLine = `${controller.deviceName} was turned ${signal}`
        let durationString = ' starting...'
        
        let duration = 0
        if (controller.value === 0) {
            for (
                let i = index + 1;
                i < reversedControllerInfo.length;
                i++
            ) {
                if (
                    reversedControllerInfo[i].deviceName ==
                        controller.deviceName &&
                    reversedControllerInfo[i].value === 1
                ) {
                    duration = Math.floor(
                        Math.abs(
                            new Date(controller.createAt) -
                                new Date(reversedControllerInfo[i].createAt)
                        )
                    )
                    const hour = Math.floor(duration / (1000 * 60 * 60))
                    const minute = Math.floor(duration / (1000 * 60))
                    const second = (duration / 1000) % 60
                    durationString = `:${hour}:${minute}:${second}`
                    break
                }
            }
        }
        return (
            <li className='w-full py-1 rounded border-b font-mono text-lg flex flex-col'>
                {/* <span className='font-semibold'>
                    {controller.createAt}:{' '}
                </span> */}
                <div className='flex justify-between'>
                    <p className='font-semibold text-xl text-primary-400'>
                        {controller.deviceName}
                    </p>    
                    <FontAwesomeIcon icon="fa-solid fa-power-off" className={`text-xl ${signal === 'on' ? 'text-green-400': 'text-red-500'}`}/>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2  text-sm'> 
                                <FontAwesomeIcon
                                    icon='fa-solid fa-clock'
                                    className='text-primary-400'
                                />
                                <p className='font-light leading-3 text-neutral-500'>
                                    {controller.createAt}   
                                </p>
                        </div>
                    <span className='text-sm leading-1 text-primary-200'>{durationString}</span>
                </div>

            </li>
        )
    }

    const SensorItem = ({sensor, index}) => {
        const historyLine = `${sensor.sensorType} = ${sensor.value}${
            NameToUnitMapping[sensor.sensorType]
        }`

        return (
            <li className='w-full py-1 rounded border-b font-mono text-lg flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span
                        className="text-sm text-neutral-400"
                    >
                        {sensor.createAt}:{' '}
                    </span>
                    <p className={`font-bold ${sensor.sensorType.startsWith('Water')
                                ? "text-blue-300"
                                : sensor.sensorType.startsWith('Soil')
                                ? "text-yellow-700"
                                : "text-neutral-500"}`}>

                        {`${sensor.sensorType} = ${sensor.value}${NameToUnitMapping[sensor.sensorType]}`}   
                    </p>
                </div>
                <FontAwesomeIcon 
                    icon={`fa-solid ${sensor.sensorType.startsWith('Soil')? 
                        sensorStyle.earth.icon    
                        : sensor.sensorType.startsWith('Water') ? sensorStyle.water.icon 
                        : sensorStyle.air.icon 
                    }`}
                    className={`text-2xl p-2 ${
                        sensor.sensorType.startsWith('Soil')? sensorStyle.earth.text
                        : sensor.sensorType.startsWith('Water') ? sensorStyle.water.text 
                        : sensorStyle.air.text 
                    }`}/>

            </li>
        )
    }

    return (
        <>
            <div className='absolute w-full h-full left-0 flex flex-col py-12 px-[inherit]'>
                    <ul className='relative flex flex-col gap-3 w-full h-auto bg-white rounded-lg py-4 px-5 justify-between items-center'>
                        <p className='text-2xl font-bold text-main-300 self-start'>{deviceType === "controller" ? `Controller History` : `Sensor History`}</p>
                        <a 
                        href={deviceType === "controller" ? contractAddressUrl : sensorAddressUrl}
                        className='font-mono text-sm self-start underline text-primary-400 -mt-3 ml-0.5'>
                            View more at EtherScan
                        </a>
                        <PaginatedItems itemsPerPage={9} items={deviceType=== "controller" ? reversedControllerInfo : sensorsData}/>
                        <div className='absolute bottom-1 right-0 p-[inherit]'>
                            <FontAwesomeIcon 
                            onClick={deviceType=== "controller" ? handleExportControllerInfoToExcel :handleExportSensorsDataToExcel}
                            icon="fa-solid fa-file-export"  className='text-2xl text-main-300 hover:text-main-100'/>
                        </div>
                    </ul>
            </div>
        </>
    )
}


export default History