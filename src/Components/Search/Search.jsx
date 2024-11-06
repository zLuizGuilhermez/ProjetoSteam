import React, { useState } from 'react'
import searchButton from '../../assets/search-w.png'
import '../Search/Search.css'

const Search = () => {

    const [id,setid] = useState('');

    const change = (event) => {

        setid(event.target.value);
    };

    const click = () => {
        console.log('Searching for:', id);
        saveid(id)
    };
    

    return (
        <div className='searchBox'>
            <div className='search'>
                <input onChange={change} type="text" 
                placeholder='Search your info'
                />
                <button className='SearchButton' onClick={click}>
                    <img src={searchButton} alt='Search icon' />
                </button>
            </div>    
        </div>
    );
};

export default Search