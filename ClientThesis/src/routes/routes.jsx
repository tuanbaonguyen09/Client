import Login from "../pages/Auth/Login";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Dashboard from "../pages/Dashboard/Dashboard";
import Form from "../pages/Form/Form";

import Layout from "../components/Interface/Layout/Layout";

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";


const AnimatedRoutes = () => {
    const isConnected = useSelector((state) => state.login.isConnected)
    const navigate = useNavigate()
    const publicRoutes = [
        {path: '/', component: Home},
        {path: '/auth', component: Login, loader: () => isConnected && navigate('/menu')},
        {path: '/menu',component: Menu},
        {path: '/menu/dashboard', component: Dashboard},
        {path: '/menu/form', component: Form}
    ]
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
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
                                loader={route.loader}
                            />
                        )
                    })}
                </Routes>
        </AnimatePresence>
    )
}




export default AnimatedRoutes