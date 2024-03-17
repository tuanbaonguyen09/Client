import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { cropInfoABI, cropInfoAddress } from '../../constant'

import { setLoadingState } from '../Loading/Slice'
import { login } from '../Connect/Slice'

// export const login = createAsyncThunk(
//     'user/',
//     async (data,{rejectWithValue}) => {
//         try {
//             if (typeof window.ethereum === 'undefined') {
//                 alert('Please install MetaMask.');
//                 return rejectWithValue('MetaMask not installed');
//             }
//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             return accounts[0]; // Return the first account as the fulfilled action payload
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue(error.toString());
//         }
//     }
// )

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
                console.log(structuredCrops)
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

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCropData.fulfilled, (state, action) => {
                state.currentAccount = action.payload
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
    },
})

// Action creators are generated for each case reducer function
export const { pushControllerInfo, resetAll } = Slice.actions

export default Slice.reducer