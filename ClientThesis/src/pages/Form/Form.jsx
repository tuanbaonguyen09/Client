import Input from "../../components/UI/Input/Input";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {motion} from 'framer-motion'

import {useDispatch} from 'react-redux'
import { addCropToBlockChain, initCrop, setFormData } from "../../redux/Crop/Slice";



const Form = () => {
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormData(
            {name: name, value: value}
        ));
      };

    const handleSubmit = () => {
        console.log('Submitting...')
        dispatch(addCropToBlockChain())
    }


    const textVariant = {
        default: {
            visibility: 'hidden',

        },
        hover: {
            color: "#79ac78",
            visibility: 'visible',
            transition:{
                delay: 0.2,
            }
        },
    }
    const mainVariant = {
        default: {
            background: 'transparent',
        },
        hover: {
            background: "#EDF1D6",
            width: 130,
        },
    }

    return (
        <div className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-xl px-4 py-6 bg-primary-300
        w-full max-w-[80%]
        flex flex-col gap-6
        ">  
            <div className="
            flex justify-between items-center font-semibold text-2xl text-primary-50">
                Information
                <motion.div
                    onClick={() => dispatch(initCrop())}
                    initial="default"
                    whileHover="hover"
                    variants={mainVariant}
                    className="
                    cursor-pointer group
                    flex items-center justify-center rounded-full bg-transparent w-11 h-11"
                >
                    <motion.p

                    variants={textVariant}
                    className="text-[13px] absolute font-semibold"
                    >Initialize your crop</motion.p>
                    <FontAwesomeIcon className="group-hover:hidden" icon="fa-solid fa-upload" />   
                </motion.div>
            </div>
            <form className="grid grid-cols-4 gap-x-2 gap-y-6">
                <div className="col-span-3">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='cropType'
                            type='text'
                            label='Crop Name'
                            onChange={handleChange}
                        />   
                </div>
                <div className="col-span-1">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='noOfCrops'
                            type='number'
                            label='No.'
                            onChange={handleChange}
                        />   
                </div>
                <div className="col-span-4">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='plantingDate'
                            type='date'
                            label='Planting Date'
                            onChange={handleChange}
                        />   
                </div>
                <div className="col-span-4">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='harvestDate'
                            type='number'
                            label='No. month to harvest'
                            onChange={handleChange}
                        />   
                </div>
                <div className="col-span-4">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='fertilizers'
                            type='text'
                            label='Fertilizers'
                            onChange={handleChange}
                        />   
                </div>
                <div className="col-span-4">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='pesticides'
                            type='text'
                            label='Pesticides'
                            onChange={handleChange}
                        />   
                </div>
                <div className="col-span-4">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='diseases'
                            type='text'
                            label='Diseases'
                            onChange={handleChange}
                        />   
                </div>
                <div className="col-span-4">
                    <Input
                            // className="col-span-2"
                            required={true}
                            name='additionalInfo'
                            type='text'
                            label='Additional Information'
                            onChange={handleChange}
                        />   
                </div>
            </form>
            <button onClick={handleSubmit}
            className="
            bg-main-100 rounded-md w-fit px-5 py-1 self-end
             text-lg font-semibold font-mono text-primary-500
            focus:outline-none
            hover:bg-primary-400 hover:text-main-100
            ">
                Publish
            </button>
        </div>
    )
}

export default Form;