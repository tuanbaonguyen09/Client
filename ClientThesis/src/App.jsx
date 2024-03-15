import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './routes/routes'

import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
library.add(fas, fab)

function App() {

    return (
        <Router>
            <AnimatedRoutes/>
        </Router>
    )
}

export default App
