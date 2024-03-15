import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './Loading/Slice'
import loginReducer from './Connect/Slice'
const store = configureStore({
    reducer:{
        loading: loadingReducer,
        login: loginReducer,
    }
})

export default store;