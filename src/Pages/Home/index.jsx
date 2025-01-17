import { useState, useRef } from 'react';
import './Style.css';
import Navbar from '../../Components/Navbar/navbar';
import Search from '../../Components/Search/Search';
import ShowInfo from '../../Components/ShowInfo/ShowInfo';

const Home = () => {
    const [theme, setTheme] = useState('dark');
    const [id, setId] = useState(''); // Para armazenar o id do usuário
    const showInfoRef = useRef(null); // Ref para acessar ShowInfo

    // Função que será chamada quando o Search enviar o ID
    const saveid = (newId) => {
        setId(newId); // Atualiza o id no estado
        console.log('ID recebido:', newId);
        
        // Chama a função fetchInfo passando o id diretamente para ShowInfo
        if (showInfoRef.current) {
            showInfoRef.current.fetchInfo(newId); // Chama a função diretamente do ShowInfo
        }
    };

    return (
        <div className={`container ${theme}`}>

            <Navbar theme={theme} setTheme={setTheme} />

            <div className={`tituloSite ${theme}`}>
                <h1>Steam Info Finder</h1>
            
            </div>

            <Search theme={theme} saveid={saveid} />
            <ShowInfo theme={theme} id={id} ref={showInfoRef} /> {/* Usando ref para acessar ShowInfo */}

        </div>
    );
};

export default Home;
