import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import steam from "../../assets/steam.png";

const Carousel = ({ card }) => {
  const [mediaTransition, setMediaTransition] = useState(210);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? card.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === card.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setMediaTransition(210);
      } else if (window.innerWidth >= 810) {
        setMediaTransition(180);
      } else if (window.innerWidth >= 440) {
        setMediaTransition(0);
      }else if (window.innerWidth >= 0) {
        setMediaTransition(0);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!card || card.length === 0) {
    return <p className="text-white">No data available</p>;
  }

  return (
    <div className="border shadow-2xl flex justify-center lg:w-2/3 sm:w-3/4 w-full h-full border-2 border-gray-500 rounded-lg gap-4 md:p-4 lg:p-9 sm:p-3 p-2 bg-transparent mb-9">
      <div className="flex flex-col w-full lg:w-[47rem] text-4xl gap-9 items-center justify-center h-[25rem] relative">
        <div>
          <p className="lg:text-4xl md:text-3xl sm:text-lg xs:text-base duration-300 dark:text-white text-dark inter text-center">
            Most games played in the last 2 weeks
          </p>
        </div>
        <div className="flex relative w-full h-full justify-center">
          {card.map((item, index) => {
            const position = index - activeIndex;
            const isVisible = Math.abs(position) <= 1;
            const pointerEvents = isVisible ? "auto" : "none";

            return (
              <motion.div
                key={index}
                className={`border-r-4 border-b-4 border-purple-600 shadow-lg lg:w-52 lg:h-72 xs:w-52 xs:h=72 md:w-44 md:h-72 sm:w-52 sm:h-72 w-36 h-72 cursor-pointer absolute ${
                  isVisible ? "" : "hidden"
                }`}
                onClick={() => handleClick(index)}
                animate={{
                  x: position * mediaTransition,
                  scale: activeIndex === index ? 1.1 : 1,
                  zIndex: activeIndex === index ? 20 : 10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ pointerEvents }}
              >
                <div className="relative w-full h-full flex">
                  <div className="absolute top-0 left-0 w-full h-full bg-black z-0"></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-2 opacity-20"
                    style={{
                      backgroundImage: `url(${item.header_image})`,
                    }}
                  ></div>
                  <div className="flex xs:flex-col sm:flex-col md:flex-row lg:flex-row justify-between w-full gap-2 p-2 lg:h-1/4 md:h-1/4 sm:h-full xs:h-full h-1/4">
                    <div className="z-20 shadow shadow-xl w-1/2 h-1/2 xs:w-full sm:w-full flex flex-col items-center">
                      <img
                        src={item.capsule_imagev5}
                        alt={item.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "fallback-image-url";
                        }}
                      />
                      <div className="w-1/4 pt-2">
                        <a
                          href={`https://store.steampowered.com/app/${item.appid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={steam} alt="Steam Store" />
                        </a>
                      </div>
                    </div>
                    <div className="w-full xs:flex sm:flex justify-center">
                      <h2 className="lg:text-base md:text-sm sm:text-xs xs:text-xs relative inter z-2 font-bold text-center text-white">
                        {item.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-md dark:text-white text-black bg-transparent"
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-md dark:text-white text-black bg-transparent"
          onClick={handleNextClick}
        >
          &gt;
        </button>
        <div className="flex justify-center mt-4">
          {card.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === activeIndex ? "bg-purple-600" : "bg-gray-400"
              }`}
              onClick={() => handleClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;