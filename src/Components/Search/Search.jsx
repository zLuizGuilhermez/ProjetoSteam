import React, { useState } from "react";
import searchButton from "../../assets/search-w.png";
import "../Search/Search.css";

const Search = ({ saveid, theme, trocarComponente, Componente }) => {
  const [forValidation,setForValidation] = useState("");
  const [id, setid] = useState("");

  const change = (event) => {
    setForValidation(event.target.value);
  };


  const inputFilter = () => {
    if (forValidation.includes("https://steamcommunity.com/id/")) {
      // Extraindo tudo depois de "/id/" e parando na próxima "/"
      const extracted = forValidation.split("/id/")[1].split("/")[0]; 
      saveid(extracted); // Salva somente o ID extraído corretamente
    }else if(forValidation.includes("https://steamcommunity.com/profiles/")){
      const extracted = forValidation.split("/profiles/")[1].split("/")[0]; 
      saveid(extracted);
    }
  };

  const id2To64 = () =>{
    
    const STEAM64_BASE = 76561197960265728n; // BigInt

    const match = forValidation.match(/^STEAM_\d:(\d):(\d+)$/);
    if (!match) throw new Error("Formato inválido de Steam2ID");
    
    const Y = BigInt(parseInt(match[1], 10)); // Convertendo para BigInt
    const accountID = BigInt(parseInt(match[2], 10)); // Convertendo para BigInt
    
    const steamID32 = (accountID * 2n) + Y; // Operações com BigInt
    
    const result = (steamID32 + STEAM64_BASE).toString(); // Converte para String
    
    saveid(result);
    


  }

  const id3To64 = () =>{
    const STEAM64_BASE = 76561197960265728n;

    if(forValidation.startsWith("[U:")){

      const match = forValidation.match(/^\[U:1:(\d+)\]$/);
      
      const accountID = BigInt(match[1]); // Extrai o AccountID como BigInt
  
      // Calcula o Steam64 ID
      const result = (accountID + STEAM64_BASE).toString(); // Converte para String
      
      saveid(result);
    }else if(forValidation.startsWith("U:")){
      
      const match = forValidation.match(/^U:1:(\d+)$/);
      
      const accountID = BigInt(match[1]); // Extrai o AccountID como BigInt
  
      // Calcula o Steam64 ID
      const result = (accountID + STEAM64_BASE).toString(); // Converte para String
      
      saveid(result);
    }


  }
  


  const validacao = () =>{
    if (forValidation && forValidation.length === 17 && !isNaN(id)) {
      saveid(forValidation);
    }else if(forValidation && forValidation.length >= 27 && !isNaN(id)){
      inputFilter(id)
    }else if(forValidation.startsWith("STEAM_")){

      id2To64(forValidation);

    }else if(forValidation.startsWith("[U:")){
      
      id3To64(forValidation);
      
    }else if(forValidation.startsWith("U:")){

      id3To64(forValidation);
    
    }
  }

  const trocarC = () => {
    trocarComponente("new");
  };

  if (Componente === "old") {
    return (
      <div className="w-full max-w-6xl mx-auto lg:mx-0 flex items-center px-4 sm:px-24 lg:px-0">
        <div className="border shadow-2xl border-2 border-gray-500 flex flex-col rounded-lg gap-4 h-full w-full relative p-6 sm:p-12 bg-transparent">
          {/* Título */}
          <div className="flex flex-wrap items-center h-24 w-full">
            <p
              className={`inter cor-${theme} lg:text-8xl max-sm:text-5xl bg-clip-text text-transparent`}
            >
              Steam
              <span className="inter lg:text-8xl max-sm:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text pl-2 text-transparent">
                Infofinder
              </span>
            </p>
          </div>

          {/* Texto de boas-vindas */}
          <div className="">
            <p
              className={`inter corTexto-${theme} text-lg  sm:text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words`}
            >
              Welcome to{" "}
              <span className="text-purple-400">Steam Infofinder</span>, a
              platform for
              <br />
              searching Steam user informations
            </p>
          </div>
          <div className="">
            <p
              className={`text-sm corTexto-${theme} sm:text-base gap-y-60 inter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words`}
            >
              Have you ever thought about gathering all relevant information
              about a user in one place? <br />
              Here, you have it all in a very simple way... Just enter the
              profile link and search!
            </p>
          </div>

          {/* Barra de pesquisa */}
          <div className="pt-32">
            <div className="mt-4 shadow-2xl w-full  sm:w-2/3 h-14 flex">
              <input
                onChange={change}
                type="text"
                placeholder="Enter with steam url, steam64 ID, steam3 ID, steam2 ID "
                className={`w-full corInput-${theme} pl-4 border border-purple-500 rounded-l-lg focus:ring-0 focus:outline-none bg-transparent text-white placeholder-gray-400 text-xs sm:text-sm`}
              />
              <button
                className="w-16 border border-purple-500 shadow-lg shadow-purple-500/50 hover:bg-purple-500 duration-300 rounded-r-lg flex items-center justify-center bg-transparent"
                onClick={() => {
                  validacao();
                  if (forValidation != "") {
                    trocarC();
                  }
                }}
              >
                <img src={searchButton} alt="Search icon" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Search;
