import Login from "../pages/Auth/Login";
import Home from "../pages/Home/Home";
import Layout from "../components/Interface/Layout/Layout";
import Menu
 from "../pages/Menu/Menu";
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import Dashboard from "../pages/Dashboard/Dashboard";

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/auth', component: Login},
    {path: '/menu', component: Menu},
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