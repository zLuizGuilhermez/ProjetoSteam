import { useState } from 'react';
import './Style.css';
import Navbar from '../../Components/Navbar/navbar'; 

const Home = () => {

    const [theme,setTheme] = useState('dark');

    return (
        <div className={`container ${theme}`}>
            <Navbar theme={theme} setTheme={setTheme}/>
        </div>
    );
};

export default Home;
