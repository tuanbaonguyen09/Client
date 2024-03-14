import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './Loading/Slice'

const store = configureStore({
    reducer:{
        loading: loadingReducer,
    }
})

export default store;