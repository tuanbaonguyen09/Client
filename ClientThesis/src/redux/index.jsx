import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './Loading/Slice'
import loginReducer from './Connect/Slice'
import controlerReducer from './Controller/Slice'
import historyReducer from './History/History'


const store = configureStore({
    reducer:{
        loading: loadingReducer,
        login: loginReducer,
        controller: controlerReducer,
        history: historyReducer
    }
})

export default store;