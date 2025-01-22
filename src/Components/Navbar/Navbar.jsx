import React, { useState } from 'react';
import '../Navbar/Navbar.css';
import modeDark from '../../assets/night.png';
import modeLight from '../../assets/day.png';
import logoWeb from '../../assets/Logo.png';

const Navbar = ({theme, setTheme}) => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu no celular
  
  const ToggleMode = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="w-full sm:w-2/3 flex items-center mt-24 justify-between border border-gray-500 rounded-lg bg-transparent shadow-xl p-4 text-white h-14">
      <div className="flex items-center space-x-2">
        <a href='index.jsx' className="text-xl font-bold">
          <span className="text-white">Steam</span> 
          <span className="text-purple-500">Infofinder</span>
        </a>
      </div>
  
      <div className="flex items-center space-x-6 text-lg hidden sm:flex">
        <a href="index.jsx" className="font-bold text-white border-b-2 border-white">Home</a>
        <a href="#" className="text-gray-300 hover:text-white transition">Sobre nós</a>
  
        <button onClick={ToggleMode} className="bg-purple-500 p-2 rounded-lg">
          <img src={theme === 'dark' ? modeDark : modeLight} className="w-5" alt="Toggle theme" />
        </button>
      </div>
      
      {/* Toggle Menu Icon for Mobile */}
      <button onClick={toggleMenu} className="sm:hidden text-white">
        <span className="text-2xl">&#9776;</span>
      </button>

      {/* Menu de navegação em dispositivos móveis */}
      {menuOpen && (
        <div className="absolute top-14 right-0 bg-purple-500 flex flex-column w-full p-4 rounded-lg sm:hidden">
          <a href="index.jsx" className="block text-white mb-2">Home</a>
          <a href="#" className="block text-white mb-2">Sobre nós</a>
          <button onClick={ToggleMode} className="block text-white">Trocar Tema</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
