import { useState } from "react";
import Editor from "./Editor";
import { easeInOut } from "framer-motion";
import {motion} from 'framer-motion';
import Chocolate3D from "./Chocolate3D";
const ChocolateMaker = () => {
    const [optionSelected, setOptionSelected] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const options = ['Select Flavor', 'Pick a Shape', 'Done'];
    const handleClick = (index: number) => {
        if(index == 0){
            setOptionSelected('flavor');
            setVisible(true);
        }
        else if(index == 1){
            setOptionSelected('shape');
            setVisible(true);
        }
    }
    return(
        <motion.div className="flex flex-row"
        initial={{x:-300}}
        whileInView={{x:0}}
        transition={{duration:0.5, ease:easeInOut}}
        >
            <Editor dropdownType={optionSelected} visible={visible} setVisible ={setVisible} />
            {/* chocolate maker inputs */}
            <div className="flex  bg-[rgba(255,255,255,0.2)] backdrop-blur-md flex-col h-screen w-[50vw]">
                <div className="mt-10 mx-auto space-y-10 text-center w-full">
                {options.map((option,index) => (
                    <motion.button key={index} onClick={() => handleClick(index)} className="rounded-lg hover:scale-105 transition-transform duration-100 ease-in w-3/4 mx-auto mt-2 bg-white p-4"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{ duration: 0.9, delay: parseFloat(`0.${index}`) }}
                    >
                        <text className="text-3xl  text-blue-500 font-black">{option}</text>
                    </motion.button>
                ))}
                </div>
            </div>
            {/* chocolate preview */}
            <div className="w-[50vw] overflow-x-hidden justify-en">
                <Chocolate3D/>
            </div>
        </motion.div>
    )
}

export default ChocolateMaker;