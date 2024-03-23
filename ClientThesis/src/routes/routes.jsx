import Login from "../pages/Auth/Login";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Dashboard from "../pages/Dashboard/Dashboard";
import Form from "../pages/Form/Form";

import Layout from "../components/Interface/Layout/Layout";

import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";


const publicRoutes = [
    {path: '/', component: Home},
    {path: '/auth', component: Login},
    // {path: '/menu',component: Menu},
    // {path: '/menu/dashboard', component: Dashboard},
    // {path: '/menu/form', component: Form}
]

const privateRoutes = [
    {path: '/menu',component: Menu},
    {path: '/menu/dashboard', component: Dashboard},
    {path: '/menu/form', component: Form}
]


const AnimatedRoutes = ({children}) => 
    <AnimatePresence mode="wait">
    {children}
    </AnimatePresence>
    

const MainRoutes = () => {
    const isLogged = useSelector((state) => state.login.isConnected)
    const location = useLocation()
    return (
            <AnimatedRoutes>
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
                    {privateRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        {isLogged ? <Page/> : <Navigate to= '/' replace/>}
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </AnimatedRoutes>
    )
}




export default MainRoutes