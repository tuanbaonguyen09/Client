import './App.css'

import Layout from './components/Interface/Layout/Layout'

import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/routes'


function App() {
  return (

        <Router>
          <Routes>
              {publicRoutes.map((route, index) => {
                  const Page = route.component
                  return (
                      <Route
                          key={index}
                          path={route.path}
                          element={
                              <Layout>
                                  <Page/>
                              </Layout>
                          }
                      />
                  )
              })}
          </Routes>
      </Router>
  )
}

export default App
