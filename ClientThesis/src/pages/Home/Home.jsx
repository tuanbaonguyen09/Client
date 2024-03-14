import './Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spline from '@splinetool/react-spline';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../redux/Loading/Slice';

// const Spline = React.lazy(() => import('@splinetool/react-spline'))

const Home = () => {
    const dispatch = useDispatch();
    return (
        <div className='bg-transparent flex flex-col min-h-[calc(100dvh)] gap-4 overflow-visible'>
                <div className='grow relative mt-14 mb-1 flex flex-col items-center justify-center'>
                    <div className='absolute top-0'>
                        <p className='
                        inline-block
                        w-full
                        bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text
                        font-bold font-mono
                        text-primary-400 text-2xl text-transparent leading-normal 
                        '>  
                                Revolutionizing 
                                Agriculture with Blockchain Technology
                        </p>
                    </div>
                        <Spline style={{
                            position: 'absolute',
                            height: '100%',
                        }} onLoad={() => dispatch(setLoadingState(false))} scene="https://prod.spline.design/ubxCn3CyOYI4bmpo/scene.splinecode" />
                    <div 
                    className='
                    flex items-center
                    animate-bounceRight
                    absolute right-0 
                    bg-transparent 
                    text-primary-400
                    rounded-md 
                    laptop:hidden
                    '>
                        <p className='font-bold text-xl uppercase'>connect</p>
                        <button>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-right" className='text-4xl'/>
                        </button>
                    </div>

                    <div 
                    className='
                    flex flex-col
                    animate-bounce
                    absolute bottom-0
                    bg-transparent 
                    text-primary-400
                    rounded-md 
                    laptop:hidden
                    '>
                        <p className='font-bold text-xl uppercase'>Creator</p>
                        <button>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-down" className='text-4xl'/>
                        </button>
                    </div>
                </div>
        </div>
    )
}


export default Home