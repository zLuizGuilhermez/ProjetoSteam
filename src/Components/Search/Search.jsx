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
        <div className="search-container w-2/3 flex items-center h-full">
            <div className="border shadow-2xl border-2 border-indigo-500 flex flex-col rounded-lg justify-around h-full w-full relative p-12 bg-transparent">
                {/* Título */}
                <div className="flex items-center h-24 w-full mb-2">
                    <p className="inter text-7xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Steam
                    </p>
                    <p className="inter text-7xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text pl-2 text-transparent">
                        Infofinder
                    </p>
                </div>

                {/* Texto de boas-vindas */}
                <div className="mb-2">
                    <p className="inter text-4xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Bem vindo ao <span className="text-purple-400">Steam Infofinder</span>, uma plataforma para<br></br> pesquisar informações de usuários da steam.
                    </p>
                </div>
                <div className="mb-2">
                    <p className="text-lg inter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Já pensou em conseguir reunir todas as informações relevantes de um usuário em um lugar só? <br />
                        Aqui você tem tudo isso de forma muito simples... Basta inserir o link do perfil e pesquisar!
                    </p>
                </div>

                {/* Barra de pesquisa */}
                <div className="mt-4 shadow-2xl w-2/3 h-14 flex">
                    {/* Input com borda roxa */}
                    <input
                        onChange={change}
                        type="text"
                        placeholder="https://steamcommunity.com/id/exemplo..."
                        className="w-full pl-4 border border-purple-500 rounded-l-lg focus:ring-0 focus:outline-none bg-transparent text-white placeholder-gray-400"
                    />
                    <button
                        className="w-16 border border-purple-500 shadow-lg shadow-purple-500/50 hover:bg-indigo-700 duration-150 rounded-r-lg flex items-center justify-center bg-transparent"
                        onClick={click}
                    >
                        <img src={searchButton} alt="Search icon" className="w-6 h-6" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Search;
