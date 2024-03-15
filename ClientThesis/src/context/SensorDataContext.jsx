import { useState, useEffect, createContext } from 'react'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux'

import { sensorDataAddress, sensorDataABI } from '../utils/Constants'

export const SensorDataContext = createContext()

const { ethereum } = window

const createSensorDataContract = () => {
    // const privateKey = import.meta.env.VITE_PRIVATE_KEY; //to use this, create .env at root and include your private key there
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // const wallet = new ethers.Wallet(privateKey, provider); //uncomment this
    const sensorDataContract = new ethers.Contract(sensorDataAddress, sensorDataABI, signer) //change signer to wallet
    return sensorDataContract
}

export const SensorDataProvider = ({ children }) => {
    const [sensorsData, setSensorsData] = useState([])
    const [sensorsDataCount, setSensorsDataCount] = useState()

    const isConnected = useSelector((state) => state.login.isConnected)
    const currentAccount = useSelector((state) => state.login.currentAccount)

    const checkIfWalletIsConnectedAndFetchData = () => {
        if (isConnected) {
            getAllSensorsData()
        } else {
            console.log('No accounts found')
        }
    }

    const getTheNumberOfSensorsData = async () => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()

                const sensorsCount = await sensorDataContract.getNumberOfSensorsData()
                setSensorsDataCount(parseInt(sensorsCount))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllSensorsData = async () => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()

                const availableSensorsData = await sensorDataContract.getAllSensorsData()

                const structuredSensorsData = availableSensorsData.map((sensor) => ({
                    sensorType: sensor.sensorType,
                    createAt: sensor.createAt,
                    value: parseInt(sensor.value),
                }))
                setSensorsData(structuredSensorsData)
            } else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addSensorsDataToBlockchain = async (sensors) => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()

                //format before adding if needed ...
                const sensorHash = await sensorDataContract.addSensorsData(sensors)
                await sensorHash.wait() //important

                const sensorsCount = await sensorDataContract.getNumberOfSensorsData()
                setSensorsDataCount(parseInt(sensorsCount))
            } else {
                //todo
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnectedAndFetchData()
        getTheNumberOfSensorsData()
    }, [sensorsDataCount])

    useEffect(() => {
        if (currentAccount) getAllSensorsData()
    }, [currentAccount])

    return (
        <SensorDataContext.Provider
            value={{
                sensorsData,

                addSensorsDataToBlockchain,
            }}
        >
            {children}
        </SensorDataContext.Provider>
    )
}
