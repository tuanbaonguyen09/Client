import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCropData, getAllCropsInfo, getCropNumberAndLocalSaving } from '../../redux/Crop/Slice'
import { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Crop from './Crop'

const Display = () => {
    const dispatch = useDispatch()
    const cropsInfo = useSelector(state => state.crop.cropInfo)
    const currentAccount = useSelector(state => state.login.currentAccount)

    useEffect(() => {
        dispatch(fetchCropData())
        dispatch(getCropNumberAndLocalSaving())
    }, [dispatch])

    useEffect(() => {
        if (currentAccount) dispatch(getAllCropsInfo())
    }, [currentAccount, dispatch])

    const RenderItem = ({currrentItems}) => {
        return(
            <>
                {currrentItems && currrentItems.map((item, index) => <Crop key={index} crop={item}/>)}
            </>
        )
    
    }

    const PaginatedItems = ({ itemsPerPage, items }) =>  {
        const [itemOffset, setItemOffset] = useState(0);
    
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);
      
        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % items.length;
          setItemOffset(newOffset);
        };
    
        return (
            <>
                <RenderItem currrentItems={currentItems}/>
                <ReactPaginate
                    className='flex gap-1 bg-main-100 p-2 rounded-lg text-lg mt-2 text-main-600'
                    pageClassName='px-2 rounded-full'
                    activeClassName='bg-main-300 text-white'
                    breakLabel="..."
    
                    previousLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                    previousClassName="flex justify-center items-center px-0.5 rounded-full"
                    previousLinkClassName="text-main-400 h-fit"
    
                    nextLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-right "/>
                    nextClassName="flex justify-center items-center px-0.5 rounded-full"
                    nextLinkClassName="text-main-400 h-fit"
    
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                />    
            </>
        )
    }

    return (
        <>
            <div className='absolute
            w-full h-full left-0 p-[inherit] py-12'>
                <h1 className='font-bold font-mono text-primary-600 text-lg my-4 text-center'>All crops are in your hand</h1>
                <div className='flex flex-col h-auto bg-transparent rounded-xl gap-3 items-center'>
                    {currentAccount ? (
                        cropsInfo.length > 0 ? (
                            <PaginatedItems itemsPerPage={3} items={cropsInfo}/>
                        ) : (
                            <p className=' font-lato text-xl font-bold text-main-200 uppercase '>
                                Please add more crops{' '}
                            </p>
                        )
                    ) : (
                        <p className=' font-lato text-xl font-bold text-main-200 uppercase '>
                            Please connect your wallet{' '}
                        </p>
                    )}

                </div>
            </div>
        </>
    )
}


export default Display 