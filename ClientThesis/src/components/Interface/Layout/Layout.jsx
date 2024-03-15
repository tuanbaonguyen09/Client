import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { motion } from "framer-motion"


const Layout = ({children}) => {
    return (
        <motion.div
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
            <div className="
            laptop:max-w-2xl laptop:m-auto
            px-4  w-full min-h-screen ">
                {children}
            </div>
            <Footer/>
        </motion.div>
    )
    

}


export default Layout
