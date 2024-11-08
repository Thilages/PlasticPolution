import React from 'react'
// import { Class } from './../../node_modules/leaflet/src/core/Class';
import Fish from './Fish';
import FishRed from './FishRed'
import Navbar from './Navbar';
import Hero from './Hero';
import Map from './Map'


const Home = () => {
  return (
    <div>
      <div className="bg-black h-[300vh] relative overflow-hidden font-[Montserrat]">
        {/* Background gradient image */}
        <img
          className="w-[90%] left-32 top-20 z-50 absolute"
          src="https://optim.tildacdn.com/tild6665-3563-4339-b735-313065346162/-/format/webp/_.png"
          alt="background gradient"
        />

        <div
          className="bg-white w-[1px] h-[50vh] absolute left-10 top-72"
        ></div>
        <div
          className="bg-white w-[1px] h-[50vh] absolute left-16 top-64"
        ></div>

        {/* Text with higher z-index */}
        <h1 className="text-white text-9xl z-40 font-bold w-[30%] absolute ">
          HUMAN DESTROYER
        </h1>

        <Navbar />

        <h1 className='text-white text-xl z-40 font-medium w-[30%] absolute -right-5 top-40 '>
          IT IS CRUCIAL THAT WE TAKE IMMEDIATE ACTION TO PROTECT OUR OCEAN
        </h1>
        <h1 className='text-white text-xs z-40 font-extralight w-[20%] absolute right-32 top-56 '>
          For the welf being of Future-Generation
        </h1>

        <h1 className="text-white text-9xl z-50 font-bold absolute top-[80vh] ml-20">
          <span>OF THE </span>
          <span className="ml-80">OCEAN</span>
        </h1>

        {/* Floating decorative images */}
        <img
          className="absolute top-64 right-96 w-[100%] h-auto z-20 animate-brightness"
          src="https://static.tildacdn.com/tild3934-6335-4163-b962-663230326236/Vector_155.png"
          alt="decorative element 1"
        />
        <Fish top={500} left={200} size={50} />
        <Fish top={530} left={300} size={55} />
        <Fish top={400} left={100} size={65} />
        <Fish top={600} left={150} size={70} />
        <Fish top={650} left={100} size={80} />
        <Fish top={450} left={170} size={20} />


        <Fish top={400} left={1450} size={40} />
        <Fish top={440} left={1300} size={55} />
        <Fish top={360} left={1350} size={65} />
        <Fish top={480} left={1440} size={70} />
        <Fish top={520} left={1380} size={80} />
        <Fish top={400} left={1360} size={60} />

        <FishRed top={30} left={210} size={55} />
        <FishRed top={100} left={310} size={60} />
        <FishRed top={40} left={90} size={70} />
        <FishRed top={110} left={160} size={65} />
        <FishRed top={180} left={110} size={75} />
        <FishRed top={100} left={180} size={25} />

        <FishRed top={70} left={1260} size={45} />
        <FishRed top={30} left={1120} size={50} />
        <FishRed top={60} left={1260} size={55} />
        <FishRed top={140} left={1220} size={80} />
        <FishRed top={190} left={1190} size={85} />
        <FishRed top={70} left={1140} size={65} />


        <img
          className="absolute w-[100%] h-auto -top-64 -rotate-12 z-10 animate-brightness"
          src="https://static.tildacdn.com/tild3939-6336-4532-b638-396565666262/Vector_155-1_1.png"
          alt="decorative element 2"
        />
        <img
          className="absolute -top-64 left-32 w-[100%] h-auto z-10 animate-brightness"
          src="https://static.tildacdn.com/tild3934-6335-4163-b962-663230326236/Vector_155.png"
          alt="decorative element 3"
        />
        <Hero  />
        <Map />
      </div>
    </div>
  );
}

export default Home;
