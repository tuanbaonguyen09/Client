import Controller from "../../components/Interface/Controller/Controller"
import SensorList from "../../components/Interface/Sensors/SensorList"
import ChartPortal from "../../components/Interface/ChartProtal/ChartProtal"
import { useSelector } from "react-redux"

const Dashboard = () => {
    const activeSensor = useSelector(state => state.dashboard.sensorActiveID)
    return (
        <div className="border border-main-300 
        absolute w-full left-0 h-full p-[inherit] py-14
        "
        >
            <div className="
                grid grid-rows-7 relative h-full
                gap-y-3
            ">
            <div className="row-span-3 relative mx-1">  
                <div className="
                rounded-lg 
                p-4 flex flex-col justify-center
                bg-white relative w-full h-full">
                {activeSensor !== -1 ? <ChartPortal chartIndex={activeSensor}/>
                    : 
                    <div className="font-mono text-2xl font-bold text-main-300">
                        No sensor detected, please select one 
                    </div>
                }
            </div>
            </div>
            <div className="row-span-2 relative w-full">
                <SensorList/>
            </div>
            <div className="row-span-2 relative w-full">
                <Controller/>
            </div>
            </div>
        </div>
    )
}


export default Dashboard