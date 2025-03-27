import { X } from 'lucide-react';
import {easeInOut, motion} from 'framer-motion';
import clsx from 'clsx';
import { useChocolateStore } from './chocolateStore';
type editorProp = {
    dropdownType: string,
    visible: boolean,
    setVisible: (boolean: boolean) => void
}

const Editor = ({ dropdownType, visible, setVisible } : editorProp) => {
    const {changeFlavor, changeShape} = useChocolateStore();
    const flavors = ['Vanilla', 'Milk', 'Dark', 'Strawberry'];
    const shapes = ['Heart', 'Rectangle', 'Star'];
    const handleClose = () => {
        setVisible(false);
    }
    const selectFlavor = (flavor:string) => {
        changeFlavor(flavor);
    }
    const selectShape = (shape: string) => {
        changeShape(shape);
    }
    return (
        <motion.div className={clsx( "flex flex-col absolute z-50 p-10 space-y-10 border border-white bg-[rgba(255,255,255,0.3)] backdrop-blur-md rounded-md w-1/2 h-max mt-10", !visible ? 'hidden' : '')}
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.5, ease:easeInOut}}
        >
            <div onClick={handleClose} className="self-end">
                 <X color='blue' size={32} />
            </div>
            { dropdownType === 'flavor' ? (
                <>
                    <p className="text-blue-500 font-black text-2xl text-center pb-5">Choose your flavor</p>
                    <div className="flex flex-row mx-auto space-x-10">
                        {flavors.map((flavor, index) => (
                            <button onClick={() => selectFlavor(flavor)} key={index} className="bg-white rounded-lg shadow-blue-500 shadow-md p-4 hover:scale-105 transition-all ease-in">
                                <p className="text-blue-500 font-black text-lg">
                                    {flavor}
                                </p>
                            </button>
                        ))}
                    </div>
                </>
            ) :
            (
                <>
                <p className="text-blue-500 font-black text-2xl text-center pb-5">Choose a Shape</p>
                    <div className="flex flex-row mx-auto space-x-10">
                        {shapes.map((shape, index) => (
                            <button onClick={() => selectShape(shape)} key={index} className="bg-white rounded-lg shadow-blue-500 shadow-md p-4 hover:scale-105 transition-all ease-in">
                                <p className="text-blue-500 font-black text-lg">
                                    {shape}
                                </p>
                            </button>
                        ))}
                    </div>
                </>
            )
        }
        </motion.div>
        )
}

export default Editor;