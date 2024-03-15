import Login from "../pages/Auth/Login";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Layout from "../components/Interface/Layout/Layout";

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/auth', component: Login},
    {path: '/dashboard', component: Dashboard}

]
const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
                <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
    )
}




export default AnimatedRoutes