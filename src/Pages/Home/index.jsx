import './Style.css';
import Navbar from '../../Components/Navbar/navbar';
import {useState, useEffect } from 'react'
import Search from '../../Components/Search/Search';
import ShowInfo from '../../Components/ShowInfo/ShowInfo';

const Home = () => {
    const [theme, setTheme] = useState('dark');
    const [id, setId] = useState(''); // Para armazenar o id do usuário

    const saveid = (newId) => {
        setId(newId);
        console.log('ID recebido:', newId);
    };

    useEffect(() => {
        // Aplicando a classe 'dark' no html para afetar toda a página
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);


    return (
            <div>
                <Navbar theme={theme} setTheme={setTheme} />
    
                <div className={`text-xl flex justify-center font-extrabold text-4xl items-center text-black mt-6 dark:text-white duration-300 `}>
                    <h1>SteamInfoFinder</h1>
                </div>

                <Search theme={theme} saveid={saveid} />
                <ShowInfo theme={theme} id={id} /> {/* Passa o ID normalmente */}

            </div>
    );
};

export default Home;
