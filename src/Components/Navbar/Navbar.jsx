import React from "react";
import '../Navbar/Navbar.css';
import modeDark from '../../assets/night.png';
import modeLight from '../../assets/day.png';
import logoWeb from '../../assets/Logo.png';

const Navbar = ({theme, setTheme}) => {

  const ToggleMode = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  return (
    <div className="w-full relative flex items-center justify-between bg-indigo-700 shadow-xl p-4 text-white shadow-md h-24 ">
      <div className="w-24 ml-8">
        <a href='index.jsx'>
        <img src={logoWeb} alt='Logo' className='logo' />
        </a>
      </div>

      <div className="flex space-x-6 ml-auto pd pr-12">

      <ul className="text-xl  flex space-x-6 ml-auto teste mt-6">
        <a href='index.jsx'>
        <li>Home</li>  
        </a>
        <li>About</li>
      </ul>

      <img
        onClick={ToggleMode} 
        src={theme === 'dark' ? modeDark : modeLight} 
        className='cursor-pointer ml-4 w-16'
        alt="Toggle theme" 
      />

      </div>
    </div>
  );
}

export default Navbar;
