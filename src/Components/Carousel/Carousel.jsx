import React, { useState } from 'react';
import { motion } from 'framer-motion';

const cards = [
  { title: 'UI Design Certification', description: 'Starting at $8/mo annually' },
  { title: 'Free Palestine', description: '#Ceasefire' },
  { title: 'Title', description: 'Description goes here, write anything you want.' }
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="flex flex-col w-2/3 text-4xl mt-9 mb-9 gap-9 items-center justify-center h-96">
        <div>
            <p className='text-white inter '> Most games played in the last 2 weeks</p>
        </div>
      <div className="flex relative w-3/4 h-full justify-center">
        {cards.map((card, index) => {
          const position = index - (activeIndex ?? 1);
          const opacity = Math.abs(position) > 1 ? 0 : 1;

          return (
            <motion.div
              key={index}
              className="bg-white border-r-4 border-b-4 border-purple-600 shadow-lg p-6 w-52 h-72 cursor-pointer absolute"
              onClick={() => handleClick(index)}
              animate={{
                x: activeIndex === index ? 0 : position * 200,
                scale: activeIndex === index ? 1.1 : 1,
                zIndex: activeIndex === index ? 20 : 10,
                opacity: opacity
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2 className="text-xl font-bold text-center">{card.title}</h2>
              <p className="text-sm mt-2 text-center">{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
