import Loader from '../Loader/Loader';
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {

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
        '>
            <span className=''>
                
            </span>
            <button className='flex'>
                <FontAwesomeIcon icon="fa-solid fa-bars" className='text-primary-400'/>
            </button>
            <Loader/>
        </header>
    )
}


export default Header;