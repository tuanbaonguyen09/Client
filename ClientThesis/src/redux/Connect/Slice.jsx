import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";


const initialState ={
    isConnected: false,
    currentAccount: '',
}

export const login = createAsyncThunk(
    'user/login',
    async (_,{rejectWithValue}) => {
        try {
            if (typeof window.ethereum === 'undefined') {
                alert('Please install MetaMask.');
                return rejectWithValue('MetaMask not installed');
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0]; // Return the first account as the fulfilled action payload
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.toString());
        }
    }
)

export const Slice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        resetAccount: state => {
            state.currentAccount = null;
            state.isConnected = false;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.currentAccount = action.payload;
                state.isConnected = true;
            })
            .addCase(login.rejected, (state, action) => {
                // Handle the rejected case
                console.error('Connection failed:', action.payload);
            });
    },
})

export const {resetAccount} = Slice.actions

export default Slice.reducer