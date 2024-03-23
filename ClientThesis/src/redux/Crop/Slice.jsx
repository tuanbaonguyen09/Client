import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { cropInfoABI, cropInfoAddress } from '../../constant'

import { setLoadingState } from '../Loading/Slice'
import { login } from '../Connect/Slice'

const { ethereum } = window
const createEthContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const cropInfoContract = new ethers.Contract(cropInfoAddress, cropInfoABI, signer)
    return cropInfoContract
}

//Save Crops size to local storage
export const setCropSize = createAsyncThunk(
    'crop/setCropSize',
    async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthContract()
                const currentCropsCount = await cropInfoContract.getNumberOfCrop()
                window.localStorage.setItem('cropsCount', currentCropsCount)
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }
)

//Fetch crop data
export const fetchCropData = createAsyncThunk(
    'crop/fetchCropData',
    async (_,{rejectWithValue, dispatch, getState}) => {
        const globalState = getState()
        try {
            dispatch(login())
            return globalState.login.currentAccount
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.toString());
        }
    }
)

//Get all crop info
export const getAllCropsInfo = createAsyncThunk(
    'crop/getAllCropsInfo',
    async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthContract()

                const availableCrops = await cropInfoContract.getAllCropsInfo()

                const structuredCrops = availableCrops.map((crop) => ({
                    cropId: crop.cropId,
                    cropType: crop.cropType,
                    plantingDate: new Date(crop.plantingDate.toNumber() * 1000).toLocaleString(),
                    harvestDate: crop.monthsToHavest,
                    fertilizers: crop.fertilizers,
                    pesticides: crop.pesticides,
                    diseases: crop.diseases,
                    additionalInfo: crop.additionalInfo,
                    actualHarvestDate: crop.harvestDate,
                }))
                return structuredCrops
            } else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.error(error);
        }
    }
)

// Get crop info
export const getCropInfo = createAsyncThunk(
    'crop/setCropInfo',
    async (cropID) => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthContract()
                const cropInfoHash = await cropInfoContract.getCropInfo(cropID)
                return cropInfoHash
            }else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.log(error)
        }
    }
)

//Initialize a crop
export const initCrop = createAsyncThunk(
    'crop/initCrop',
    async (_,{dispatch}) => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthContract()

                const plantingDate = new Date()
                const year = String(plantingDate.getFullYear())
                const month = String(plantingDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
                const day = String(plantingDate.getDate()).padStart(2, '0')
                const unixPlantingDate = Date.parse(`${year}-${month}-${day}T00:00:00Z`) / 1000

                const cropHash = await cropInfoContract.addCropInfo(
                    'flower',
                    unixPlantingDate,
                    1,
                    [],
                    [],
                    [],
                    '',
                    1
                )
                // setIsLoading(true)
                dispatch(setLoadingState(true))
                await cropHash.wait() //important
                dispatch(setLoadingState(false))

                window.alert('Add the crop information successfully')

                const cropsCount = await cropInfoContract.getNumberOfCrop()
                return cropsCount
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }
)

//Add crop to Block Chain
export const addCropToBlockChain = createAsyncThunk(
    'crop/addCropToBlockChain', 
    async (_,{getState, dispatch}) => {
        try {
            if (ethereum) {
                const state = getState()
                const cropInfoContract = createEthContract()

                const {
                    cropType,
                    plantingDate,
                    harvestDate,
                    fertilizers,
                    pesticides,
                    diseases,
                    additionalInfo,
                    noOfCrops,
                } = state.crop.formData

                //convert date to Unix timestamp
                const [yearPlantingDate, monthPlantingDate, dayPlantingDate] =
                    plantingDate.split('-')

                const unixPlantingDate =
                    Date.parse(
                        `${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`
                    ) / 1000

                const arrayFertilizers = fertilizers !== '' ? fertilizers.split(', ') : []
                const arrayPesticides = pesticides !== '' ? pesticides.split(', ') : []
                const arrayDiseases = diseases !== '' ? diseases.split(', ') : []

                console.log('Start Adding...')
                const cropHash = await cropInfoContract.addCropInfo(
                    cropType,
                    unixPlantingDate,
                    harvestDate,
                    arrayFertilizers,
                    arrayPesticides,
                    arrayDiseases,
                    additionalInfo,
                    noOfCrops
                )
                dispatch(setLoadingState(true))
                await cropHash.wait()
                dispatch(setLoadingState(false))

                window.alert('Add the crop information successfully :)')

                const cropsCount = await cropInfoContract.getNumberOfCrop()
                return cropsCount

            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }
)

//
const isFertilizersExistInAllCrops = (cropsCount, cropInfo, fertilizers) => {
    for (let i = 0; i < cropsCount; i++) {
        for (let j = 0; j < fertilizers.length; j++) {
            if (!cropInfo[i].fertilizers.includes(fertilizers[j])) return false
        }
    }
    return true
}

//Update fertilizers 
export const updateFertilizers = createAsyncThunk (
    'crop/updateFertilizers', 
    async (fertilizers, {getState, dispatch}) => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthContract()
                const state = getState()

                if (!isFertilizersExistInAllCrops(state.crop.cropInfo, fertilizers)) {
                    const updateCropsHash = await cropInfoContract.addFertilizers(fertilizers)

                    dispatch(setLoadingState(true))
                    await updateCropsHash.wait()
                    dispatch(setLoadingState(false))
                }
            } else {
                console.log('No ethereum object')
            }
        }   catch (error) {
            console.log(error)
        }
    }
)


//Main Slice
export const Slice = createSlice({
    name: 'crop',
    initialState: {
        cropInfo: [],
        cropsCount: localStorage.getItem('cropsCount'),
        formData: {
            cropType: '',
            plantingDate: '',
            harvestDate: 0,
            noOfCrops: 0,
            fertilizers: '',
            pesticides: '',
            diseases: '',
            additionalInfo: '',
        }
    },
    reducers: {
        setFormData : (state, action) => {
            const { name, value } = action.payload;
            if (name in state.formData) {
                state.formData[name] = value;
            } else {
                console.warn(`Tried to set formData with unknown field: ${name}`);
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCropData.fulfilled, () => {
                getAllCropsInfo()
            })
            .addCase(fetchCropData.rejected, (action) => {
                // Handle the rejected case
                console.error('Connection failed:', action.payload)
            })
            .addCase(getAllCropsInfo.fulfilled, (state, action) => {
                state.cropInfo = action.payload
            })
            .addCase(initCrop.fulfilled, (state, action) => {
                state.cropsCount = action.payload
            })
            .addCase(addCropToBlockChain.fulfilled, (state, action) => {
                state.cropsCount = action.payload
            })
            .addCase(updateFertilizers.fulfilled, (state, action) => {
                getAllCropsInfo() 
            })
    },
})

// Action creators are generated for each case reducer function
export const {setFormData} = Slice.actions

export default Slice.reducer