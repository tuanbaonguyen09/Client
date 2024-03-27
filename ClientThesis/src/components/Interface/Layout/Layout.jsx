import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { AnimatePresence, motion } from "framer-motion"

import Loader from "../Loader/Loader"
import Sidebar from "../../UI/Mobile/Sidebar/Sidebar"

import { useSelector } from "react-redux"
import NavArrow from "../../UI/Navigate Arrow/NavArrow"
import { useLocation, useNavigate } from "react-router-dom"
const Layout = ({children}) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen)
    const location = useLocation()
    const isHome = location.pathname === '/'
    const navigate = useNavigate()
    return (
        <motion.div
            id="mainLayout"
            className="relative overflow-hidden"
            transition={{
                duration: 0.6,
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,

            }}
            exit={{
                opacity: 0,
                x: '-100%',
            }}
        >
            <Header/>
            <Loader/>

            <AnimatePresence mode="wait">
                {isOpen &&<Sidebar/>}
            </AnimatePresence>

            <div className=" relative
            laptop:max-w-2xl laptop:m-auto
            px-4 w-full min-h-screen ">
                    {children}
                {!isHome && <NavArrow className='bottom-6 flex-row-reverse' direction="left" name="Back" to={-1}/>}
            </div>

            <Footer/>
        </motion.div>
    )
    

}


export default Layout
