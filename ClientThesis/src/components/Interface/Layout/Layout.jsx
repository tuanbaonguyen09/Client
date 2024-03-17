import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { AnimatePresence, motion } from "framer-motion"

import Loader from "../Loader/Loader"
import Sidebar from "../../UI/Mobile/Sidebar/Sidebar"

import { useSelector } from "react-redux"
const Layout = ({children}) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen)

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
            </div>
            <Footer/>
        </motion.div>
    )
    

}


export default Layout
