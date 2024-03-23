import { useEffect, useState } from 'react'
import axios from 'axios'

import { chartNameMapping ,feedKeyMapping,unitMapping  } from '../../../utils/Mapping'
import CustomChart from '../../UI/Chart/CustomChart'
import { sensorAdafruit, sensorAdafruit2 } from '../../../constant/adafruit/adafruit'

import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

const ChartPortal = ({ chartIndex }) => {
    const activeSensor = useSelector(state => state.dashboard.sensorActiveID)
    const [data, setData] = useState([])
    const waterSensorType = feedKeyMapping[activeSensor].startsWith('water')
    const airSensorType = feedKeyMapping[activeSensor].startsWith('air')

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = sensorAdafruit.apiKey
            const url = `https://io.adafruit.com/api/v2/dangvudangtna1/feeds/${feedKeyMapping[activeSensor]}/data`

            const apiKey2 = sensorAdafruit2.apiKey
            const url3 = `https://io.adafruit.com/api/v2/fruitada_159357/feeds/${feedKeyMapping[activeSensor]}/data`

            if (
                feedKeyMapping[activeSensor].startsWith('air') ||
                feedKeyMapping[activeSensor].startsWith('water')
            ) {
                try {
                    const response = await axios.get(url3, {
                        headers: {
                            'X-AIO-Key': apiKey2,
                        },
                        params: {
                            limit: 15, // maximum number of data points
                        },
                    })

                    setData(response.data)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            } else {
                try {
                    const response = await axios.get(url, {
                        headers: {
                            'X-AIO-Key': apiKey,
                        },
                        params: {
                            limit: 15, // maximum number of data points
                        },
                    })

                    setData(response.data)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        }
        fetchData()
        const myTimer = setInterval(() => {
            fetchData()
        }, 5000)

        return () => {
            clearInterval(myTimer)
        }
    }, [activeSensor])

    const formatDateTime = (unformattedDateTime) => {
        const date = new Date(unformattedDateTime)
        const options = {
            // year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
        }
        return date.toLocaleString('vi-VN', options)
    }

    const chartData = {
        labels: data.map((item) => formatDateTime(item.created_at)).reverse(),
        datasets: [
            {
                label: 'Sensor Data',
                data: data.map((item) => item.value).reverse(),
                fill: true,
                borderColor: waterSensorType ? 'rgb(14, 165, 233)' : airSensorType ? 'rgb(163, 163, 163)' : 'rgb(202, 138, 4)',
                backgroundColor: waterSensorType ? 'rgba(103, 232, 249, 0.5)' : airSensorType ? 'rgb(163, 163, 163, 0.5)' : 'rgba(234, 179, 8, 0.5)',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled:true,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: `VALUE (${unitMapping[activeSensor]})`,
                    font: {
                        size: 12,
                        weight: 700,
                    },
                    color: '#285430',
                },
                ticks:{
                    display:false,
                    font:{
                        size:12,
                    },
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'TIME DATE',
                    font: {
                        size: 12,
                        weight: 700,
                    },
                    color: '#285430',
                },
                ticks:{
                    display:false,
                    font:{
                        size:12,
                    },
                }
            },
        },
    }

    return (
        
                <>
                    <p className={`font-bold text-2xl
                    ${  airSensorType ? "text-neutral-400"
                        : waterSensorType ? "text-blue-300"
                        : "text-yellow-700"
                    }
                    `}>{chartNameMapping[activeSensor]} History</p>
                    <CustomChart data={chartData} options={chartOptions} />
                </>
        
    )
}

export default ChartPortal
