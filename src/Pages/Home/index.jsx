import { useState } from 'react';
import './Style.css';
import Navbar from '../../Components/Navbar/navbar'
import Search from '../../Components/Search/Search'
import ShowInfo from '../../Components/ShowInfo/ShowInfo'

const Home = () => {

    const [theme, setTheme] = useState('dark');

    const [id,setId] = useState('');

    const saveid = (newId) => {
        setId(newId);
    }

    return (
        <div className={`container ${theme}`}>
            <Navbar theme={theme} setTheme={setTheme} />

            <div className={`tituloSite ${theme}`}>
                <h1>
                    Steam Info Finder
                </h1>
            </div>

            <Search theme={theme} saveid = {saveid} />

            
            <ShowInfo theme={theme} id={id}/>
            

        </div>
    );
};

export default Home;
