import {motion} from 'framer-motion'
import { useDispatch} from "react-redux";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { letSideBarClosed} from '../../../../redux/Sidebar/Slice';
import {NavLink} from 'react-router-dom'
const menuItem = [
    {
        name: 'Home', 
        path: '/',
    },
    {
        name: 'Menu', 
        path: '/menu',
    },
    {
        name: 'Creator', 
        path: '/creator',
    },
] 

const NavBar = () => {
    const dispatch = useDispatch()
    return createPortal(
        <motion.div
            className='absolute right-0 top-0 z-50 w-full h-full bg-primary-400 p-16 pt-40' 
            initial={{
                x:'100%',
            }}
            animate={{
                x:50,
            }}
            exit={{
                opacity: 0,
                x:'100%',
            }}
        >   
            <FontAwesomeIcon onClick={() => dispatch(letSideBarClosed())}
            icon="fa-solid fa-xmark" className='hover:cursor-pointer hover:opacity-35 text-4xl text-red-400 absolute top-2.5 right-0 pr-[inherit]'/>
            <nav className='flex flex-col gap-6 w-fit'>
                {menuItem.map((item, index) => {
                    return (
                        <motion.div 
                        className='
                        transform
                        duration-75
                        cursor-pointer
                        hover:scale-125
                        group
                        '
                        key={index}
                        >
                            <NavLink 
                            to={item.path}
                            className="
                            group-hover:text-primary-700
                            text-primary-100 font-semibold text-2xl">
                                {item.name}
                                {item.icon}
                            </NavLink>
                        </motion.div>
 
                    )
                })}
            </nav>
        </motion.div>, document.getElementById('mainLayout')
    )
}

export default NavBar;