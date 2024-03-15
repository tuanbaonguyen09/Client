import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/index.jsx'

import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CropInfoProvider } from './context/CropInfoContext'
import { ControllerProvider } from './context/ControllerContext'
import { SensorDataProvider } from './context/SensorDataContext'
import { AdafruitProvider } from './context/AdafruitContext'
import { TransactionProvider } from './context/TransactionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <TransactionProvider>
          <SensorDataProvider>
              <ControllerProvider>
                  <CropInfoProvider>
                      <AdafruitProvider>
                          <App />
                      </AdafruitProvider>
                  </CropInfoProvider>
              </ControllerProvider>
          </SensorDataProvider>
      </TransactionProvider>
    </Provider>
  </React.StrictMode>,
)
