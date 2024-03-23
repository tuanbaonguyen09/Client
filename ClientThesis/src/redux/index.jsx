import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './Loading/Slice'
import loginReducer from './Connect/Slice'
import controlerReducer from './Controller/Slice'
import historyReducer from './History/History'
import sidebarReducer from './Sidebar/Slice'
import cropReducer from './Crop/Slice'
import adafruitReducer from './Adafruit/Slice'
import sensorReducer from './Sensor/Slice'
import dashboardReducer from "./Dashboard/Dashboard";

const store = configureStore({
    reducer:{
        loading: loadingReducer,
        login: loginReducer,
        controller: controlerReducer,
        history: historyReducer,
        sidebar: sidebarReducer,
        crop: cropReducer,
        adafruit: adafruitReducer,
        sensor: sensorReducer,
        dashboard: dashboardReducer,
    }
})

export default store;