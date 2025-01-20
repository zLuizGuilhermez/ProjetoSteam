import { useState } from 'react';
import './Style.css';
import Navbar from '../../Components/Navbar/navbar';
import Search from '../../Components/Search/Search';
import ShowInfo from '../../Components/ShowInfo/ShowInfo';

const Home = () => {
    const [theme, setTheme] = useState('dark');
    const [id, setId] = useState(''); // Para armazenar o id do usuário

    const saveid = (newId) => {
        setId(newId);
        console.log('ID recebido:', newId);
    };

    return (
        <div className={`container ${theme}`}>
            <Navbar theme={theme} setTheme={setTheme} />
            <div className={`tituloSite ${theme}`}>
                <h1>Steam Info Finder</h1>
            </div>
            <Search theme={theme} saveid={saveid} />
            <ShowInfo theme={theme} id={id} /> {/* Passa o ID normalmente */}
        </div>
    );
};

export default Home;
