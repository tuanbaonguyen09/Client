import Device from "../../components/UI/Device/Device"
import Slider from "react-slick"
const Dashboard = () => {
    
    const renderDevice = (number) => {
        const devices = []

        for (let i = 1; i <= number; i++) devices.push(i)

        return devices.map((item, index) => {
            return (
                <Device
                    key={index}
                    device={{
                        name: `Device ${item}`,
                        index: item,
                    }}
                />
            )
        })
    }



    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        vertical: true,
        arrows: false,
        swipe: true,
    }
    return (
        <>  
            <div className="
            grid grid-cols-2
            p-[inherit]
            absolute w-full max-w-[90%] min-h-[calc(100dvh)] py-12
            ">

            <Slider  className="col-span-2" {...settings}>
                {renderDevice(8)}
            </Slider>
            </div>

        </>
    )
}


export default Dashboard