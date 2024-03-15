import Spline from '@splinetool/react-spline';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../redux/Loading/Slice';
import { useEffect } from 'react';
import NavArrow from '../../components/UI/Navigate Arrow/NavArrow';

// const Spline = React.lazy(() => import('@splinetool/react-spline'))

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoadingState(true))
    })
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

                    <NavArrow 
                        direction='right'
                        name='connect'
                        to='/auth'
                        className='right-6 flex-row'
                    />
                   

                   <NavArrow 
                        direction='bottom'
                        name='creator'
                        to='/'
                        className='bottom-6 flex-col'
                    />
                </div>
        </div>
    )
}


export default Home