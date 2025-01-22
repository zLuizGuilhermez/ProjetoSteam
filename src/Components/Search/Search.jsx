import React, { useState } from 'react';
import searchButton from '../../assets/search-w.png';
import '../Search/Search.css';

const Search = ({ saveid, theme}) => {
    const [id, setid] = useState('');

    const change = (event) => {
        setid(event.target.value);
    };

    const click = () => {
        console.log('Searching for:', id);
        saveid(id);
    };

    return (
        <div className="w-full max-w-6xl mx-auto lg:mx-0 flex items-center px-4 sm:px-24 lg:px-0">
            <div className="border shadow-2xl border-2 border-gray-500 flex flex-col rounded-lg gap-4 h-full w-full relative p-6 sm:p-12 bg-transparent">
                {/* Título */}
                <div className="flex flex-wrap items-center h-24 w-full">
                <p className={`inter cor-${theme} lg:text-8xl max-sm:text-5xl bg-clip-text text-transparent`}>
                        Steam
                    </p>
                    <p className="inter lg:text-8xl max-sm:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text pl-2 text-transparent">
                        Infofinder
                    </p>
                </div>

                {/* Texto de boas-vindas */}
                <div className="">
                    <p className={`inter corTexto-${theme} text-lg  sm:text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words`}>
                        Bem vindo ao <span className="text-purple-400">Steam Infofinder</span>, uma plataforma para<br />
                        pesquisar informações de usuários da steam.
                    </p>
                </div>
                <div className="">

                    <p className={`text-sm corTexto-${theme} sm:text-base gap-y-60 inter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words`}>
                        Já pensou em conseguir reunir todas as informações relevantes de um usuário em um lugar só? <br />
                        Aqui você tem tudo isso de forma muito simples... Basta inserir o link do perfil e pesquisar!
                    </p>

                </div>

                {/* Barra de pesquisa */}
                <div className='pt-32'>

                <div className="mt-4 shadow-2xl w-full  sm:w-2/3 h-14 flex">
                    <input
                        onChange={change}
                        type="text"
                        placeholder="https://steamcommunity.com/id/exemplo..."
                        className={`w-full corInput-${theme} pl-4 border border-purple-500 rounded-l-lg focus:ring-0 focus:outline-none bg-transparent text-white placeholder-gray-400 text-xs sm:text-sm`}
                    />
                    <button
                        className="w-16 border border-purple-500 shadow-lg shadow-purple-500/50 hover:bg-purple-500 duration-300 rounded-r-lg flex items-center justify-center bg-transparent"
                        onClick={click}
                    >
                        <img src={searchButton} alt="Search icon" className="w-6 h-6" />
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
