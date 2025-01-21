import React, { useState } from 'react';
import searchButton from '../../assets/search-w.png';
import '../Search/Search.css';

const Search = ({ saveid }) => {

    const [id, setid] = useState('');

    const change = (event) => {
        setid(event.target.value);
    };

    const click = () => {
        console.log('Searching for:', id);
        saveid(id);
    };

    return (
        <div className='flex justify-center pt-6 items-center'>
            {/* Contêiner com borda ao redor da barra de pesquisa */}
            <div className='shadow-2xl h-16 border-2 border-indigo-500 bg-indigo-500 flex rounded-lg'>
                {/* Input com borda arredondada à esquerda */}
                <input
                    onChange={change}
                    type="text"
                    placeholder='Search your info'
                    className='w-96 pl-4 border-none rounded-l-lg focus:ring-0 focus:outline-none'
                />
                <button
                    className='w-16 overflow-hidden bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 duration-150 rounded-r-lg flex items-center justify-center'
                    onClick={click}
                >
                    <img src={searchButton} alt='Search icon' className='w-6 h-6' />
                </button>
            </div>    
        </div>
    );
};

export default Search;
