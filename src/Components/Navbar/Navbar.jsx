import React, { useState } from "react";
import "../Navbar/Navbar.css";
import modeDark from "../../assets/night.png";
import modeLight from "../../assets/day.png";
import logoWeb from "../../assets/Logo.png";

const Navbar = ({ theme, setTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu no celular

  // Função para alternar entre os temas
  const ToggleMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light"); // Verifique no console se o tema está sendo alterado corretamente
  };

  // Função para abrir e fechar o menu no celular
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full sm:w-2/3 flex items-center mt-20 justify-between border-2 border-gray-500 rounded-lg bg-transparent shadow-xl p-4 text-white h-14">
      <div className="flex items-center space-x-2">
        <a href="index.jsx" className="text-xl font-bold">
          <span className={`cor-${theme} bg-clip-text text-transparent`}>
            Steam{""}
          </span>
          <span className="text-purple-500">Infofinder</span>
        </a>
      </div>

      <div className="flex items-center space-x-6 text-lg hidden md:flex">
        <a
          href="/Home.jsx"
          className={`corMenu-${theme} font-bold border-b-2 border-white`}
        >
          Home
        </a>

        <button onClick={ToggleMode} className="bg-purple-500 p-2 rounded-lg">
          <img
            src={theme === "light" ? modeLight : modeDark}
            className="w-5"
            alt="Toggle theme"
          />
        </button>
      </div>

      {/* Toggle Menu Icon for Mobile */}
      <button onClick={toggleMenu} className="md:hidden text-white">
        <span className="text-2xl">&#9776;</span>
      </button>

      {/* Menu de navegação em dispositivos móveis */}
      {menuOpen && (
        <div className="absolute top-14 right-0 bg-purple-500 flex flex-column w-full p-4 rounded-lg sm:hidden">
          <a href="index.jsx" className="block text-white mb-2">
            Home
          </a>
          <a href="#" className="block text-white mb-2">
            Sobre nós
          </a>
          <button onClick={ToggleMode} className="block text-white">
            Trocar Tema
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
