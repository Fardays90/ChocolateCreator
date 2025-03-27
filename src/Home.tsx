import { motion } from 'framer-motion';
import { easeInOut } from 'framer-motion/dom';
import { Link} from 'react-router-dom';


const Home = () => {
    return (
        <>
        {/* navbar */}
        <div className='fixed bg-[rgba(255,255,255,0.4)] w-full z-50 border-b border-white h-20 flex flex-row items-center backdrop-blur-sm'>
          <img src='/logo.png' className=' px-2 h-12'></img>
        </div>
        hero
        <div className='bg-gradient-to-bl  from-blue-300 via-sky-400 to-pink-100 h-[75vh]  w-full mx-auto flex flex-col'
      
         style={{ boxShadow: "inset 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px -4px 20px rgba(0, 0, 0, 0.2)" }}
        >
          <motion.h1 className='text-center tracking-tighter font-black my-auto text-white text-6xl drop-shadow-lg'
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1 }}
          >
            Welcome to MIMI & The Chocolate Factory!
          </motion.h1>
        </div>
        <motion.div className='flex flex-col  mx-auto space-y-10 mt-48 pb-32 bg-white w-full'
        initial={{opacity:0,y:100}}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{duration:0.5, ease:easeInOut}}
        
        >
          <h1 className='text-4xl mt-5 font-black text-center'>The Chocolate Gallery</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
            <motion.div className="bg-gradient-to-b from-50% to-50%  from-blue-400 to-pink-300   p-2 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
             initial={{opacity:0}}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             viewport={{once:true}}
            >
              <h3 className="text-2xl text-white text-center  font-semibold mb-4">Velvet Crunch</h3>
              <img src="/mimi 22.png" alt="Chocolate Design" className="w-1/2 h-52 object-contain    mx-auto rounded-lg " />
            </motion.div>
            <motion.div className="bg-gradient-to-b from-50% to-50%  from-blue-400 to-pink-300   p-2 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
             initial={{opacity:0}}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{once:true}}
            >
              <h3 className="text-2xl text-center text-white font-semibold mb-4">Design #2</h3>
              <img src="/mimi 1.png" alt="Chocolate Design" className="w-1/2 h-52 object-contain    mx-auto rounded-lg " />
            </motion.div>
            <motion.div className="bg-gradient-to-b from-50% to-50%  from-blue-400 to-pink-300   p-2 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
             initial={{opacity:0}}
             whileInView={{ opacity: 1}}
             transition={{ duration: 0.6, delay: 0.3 }}
             viewport={{once:true}}
            >
              <h3 className="text-2xl text-center text-white font-semibold mb-4">Design #2</h3>
              <img src="/mimi 33.png" alt="Chocolate Design" className="w-1/2 h-52 object-contain     mx-auto rounded-lg " />
            </motion.div>
            <motion.div className="bg-gradient-to-b from-50% to-50%  from-blue-400 to-pink-300   p-2 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
             initial={{opacity:0}}
             whileInView={{ opacity: 1}}
             transition={{ duration: 0.6, delay: 0.4 }}
             viewport={{once:true}}
            >
              <h3 className="text-2xl text-center text-white font-semibold mb-4">Design #2</h3>
              <img src="/mimi 33.png" alt="Chocolate Design" className="w-1/2 h-52 object-contain     mx-auto rounded-lg " />
            </motion.div>
          </div>
        </motion.div>
        <motion.div className='flex flex-col shadow-black shadow-md mx-auto space-y-10 mt-48 pb-12 bg-white w-full'
        initial={{opacity:0,y:100}}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{duration:0.5, ease:easeInOut}}
        
        >
          <h1 className='text-4xl mt-5 font-black text-center'>Design it, decorate it, devour it</h1>
          <Link to={"/create"} className='bg-blue-400 hover:scale-110 transition-all ease-in rounded-lg w-max h-max mx-auto'><p className='p-3 text-white text-2xl font-bold'>Start Creating</p></Link>
        </motion.div>
        </>
    )
}

export default Home;