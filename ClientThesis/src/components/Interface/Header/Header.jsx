import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { letSideBarOpen } from '../../../redux/Sidebar/Slice';
import {motion} from 'framer-motion'
import { resetAccount } from '../../../redux/Connect/Slice';
import {useNavigate} from 'react-router-dom'
const Header = () => {
    const dispatch = useDispatch()
    const isConnected = useSelector((state) => state.login.isConnected)
    const navigate = useNavigate()

    const textVariant ={
        default: {
            visibility: 'hidden'
        },
        hover:{
            visibility: 'visible'
        }
    }

    const mainVariant = {
        default: {
            background: 'transparent'
        },
        hover:{
            background: '#79ac78',
            width: 120,
        }
    }

    const handleLogOut = () => {
        dispatch(resetAccount())
        navigate('/')
    }

    return (
        <header 
        className='
            absolute top-0
            w-screen
            px-4 py-2.5
            flex justify-between items-center
            bg-transparent
            text-black
            text-3xl
            z-20
        '>  
            {
                isConnected ?
                <motion.div 
                    onClick={handleLogOut}
                    initial="default"
                    whileHover="hover"
                    animate="default"
                    variants={mainVariant}
                    className='
                    group w-11 h-11 rounded-full
                    flex justify-center items-center
                    bg-white '>

                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" 
                        className='
                        group-hover:text-primary-700
                        group-hover:hidden
                        text-2xl text-primary-500'/> 
                    <motion.p
                    className='absolute text-sm font-semibold uppercase text-main-100'
                    variants={textVariant}
                    >Log out</motion.p>
                </motion.div>
                :
                <div></div>
            }

            <button className='flex hover:cursor-pointer' onClick={() => dispatch(letSideBarOpen())}>
                <FontAwesomeIcon icon="fa-solid fa-bars" className='text-primary-400'/>
            </button>
        </header>
    )
}


export default Header;