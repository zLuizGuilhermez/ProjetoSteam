import './Style.css';
import Navbar from '../../Components/Navbar/navbar';
import { useState, useEffect } from 'react';
import Search from '../../Components/Search/Search';
import ShowInfo from '../../Components/ShowInfo/ShowInfo';

const Home = () => {
    const [theme, setTheme] = useState('dark'); // Mude o valor inicial para 'light', ou o que você preferir

  const [id, setId] = useState(''); // Para armazenar o id do usuário

  const saveid = (newId) => {
    setId(newId);
    console.log('ID recebido:', newId);
  };

  useEffect(() => {
    // Aplicando a classe 'dark' no html para afetar toda a página
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Current theme:', theme);
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Current theme:', theme);
    }
  }, [theme]);

  return (
    <div className="h-screen w-full">
      <div className="absolute h-4/6 w-2/4 rounded-full blur-3xl opacity-10 -top-80 -left-96 bg-purple-700">
        <p className="">a</p>
      </div>
      <div className='flex justify-center'>
        <Navbar theme={theme} setTheme={setTheme} />
      </div>
      <div className='flex justify-center mt-12 h-2/3'>
        <Search theme={theme} saveid={saveid} />
      </div>

    </div>
  );
};

export default Home;
