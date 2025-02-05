import React, { useState } from "react";
import searchButton from "../../assets/search-w.png";
import "../Search/Search.css";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ saveid, theme, trocarComponente, Componente }) => {
  const [forValidation,setForValidation] = useState("");
  const [id, setid] = useState("");

  //muda o estado do input
  const change = (event) => {
    setForValidation(event.target.value);
  };

  //verifica se existe um usuario com esse id
  const verifyInfo = async (idNow) => {

    try{

      const response = await axios.get(
        `backendsteamproject-production.up.railway.app/api/infoController/toInfoService/${idNow}`
      );

      if(response.data !== null){
        saveid(idNow)
        trocarComponente("new");
    
      }

    }catch(error){
      console.log("deu erro")
      if(error.response.status === 500){
        trocarComponente("error");
      } 
    }
    


  }

  //filtra o nome do url

  const inputFilter = () => {
    if (forValidation.includes("https://steamcommunity.com/id/")) {
      const extracted = forValidation.split("/id/")[1].split("/")[0]; 
      foundIdByUrl(extracted); 
    }else if(forValidation.includes("https://steamcommunity.com/profiles/")){
      const extracted = forValidation.split("/profiles/")[1].split("/")[0]; 
      foundIdByUrl(extracted);
    }
  };


  //verifica se existe alguma pessoa com esse nome de url
  const foundIdByUrl = async (id) => {
    try {
      const response = await axios.get(
        `backendsteamproject-production.up.railway.app/api/infoController/toChangeUrlToId/${id}`
      );
      
      if(response.data.success === 1){
        saveid(response.data.steamid)
        trocarComponente("new");
      }

    } catch (error) {
      console.log("deu erro")
      if(error.response.status === 404){
        trocarComponente("error");
      } 
    }
  };

   // transforma o id2 para 64
  const id2To64 = () =>{
    
    const STEAM64_BASE = 76561197960265728n; 

    const match = forValidation.match(/^STEAM_\d:(\d):(\d+)$/);
    if (!match) throw new Error("Formato inválido de Steam2ID");
    
    const Y = BigInt(parseInt(match[1], 10)); 
    const accountID = BigInt(parseInt(match[2], 10)); 
    
    const steamID32 = (accountID * 2n) + Y; 
    
    const result = (steamID32 + STEAM64_BASE).toString(); 
    
    verifyInfo(result);
    


  }

  //transforma o id3 para 64
  const id3To64 = () =>{
    const STEAM64_BASE = 76561197960265728n;

    if(forValidation.startsWith("[U:")){

      const match = forValidation.match(/^\[U:1:(\d+)\]$/);
      
      const accountID = BigInt(match[1]); // Extrai o AccountID como BigInt
  
      // Calcula o Steam64 ID
      const result = (accountID + STEAM64_BASE).toString(); // Converte para String
      
      verifyInfo(result);
    }else if(forValidation.startsWith("U:")){
      
      const match = forValidation.match(/^U:1:(\d+)$/);
      
      const accountID = BigInt(match[1]); // Extrai o AccountID como BigInt
  
      // Calcula o Steam64 ID
      const result = (accountID + STEAM64_BASE).toString(); // Converte para String
      
      verifyInfo(result);
    }


  }

  //recebe o id ou url e valida
  const validacao = () =>{
    if (forValidation && forValidation.length === 17 && !isNaN(forValidation)) {
      verifyInfo(forValidation);
    }else if(forValidation && forValidation.length >= 27 && forValidation.startsWith("https")){
      inputFilter(id)
    }else if(forValidation.startsWith("STEAM_")){

      id2To64(forValidation);

    }else if(forValidation.startsWith("[U:")){
      
      id3To64(forValidation);
      
    }else if(forValidation.startsWith("U:")){

      id3To64(forValidation);
    
    }else if (forValidation && forValidation.length < 17) {
      foundIdByUrl(forValidation);
    }
  }

  if (Componente === "old") {
    return (
      <div className="w-full max-w-6xl mx-auto lg:mx-0 flex items-center px-4 sm:px-4 md:px-24 lg:px-0">
        <div className="border shadow-2xl border-2 border-gray-500 flex flex-col rounded-lg gap-4 h-full w-full relative p-6 sm:p-6 bg-transparent">
          {/* Título */}
          <div className="flex break-words flex-wrap items-center h-24 w-full">
            <p
              className={`inter cor-${theme} lg:text-8xl md:text-6xl sm:text-5xl bg-clip-text text-transparent`}
            >
              Steam
              <span className="inter font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text pl-2 text-transparent">
                Infofinder
              </span>
            </p>
          </div>

          {/* Texto de boas-vindas */}
          <div className="lg:w-2/3 sm:w-full">
            <p
              className={`inter corTexto-${theme} text-wrap text-lg sm:text-2xl bg-clip-text text-transparent break-words`}
            >
              Welcome to{" "}
              <span className="text-purple-400 duration-300">Steam Infofinder</span>, a
              platform for
              
              searching Steam user informations
            </p>
          </div>
          <div className="w-2/3">
            <p
              className={`text-sm corTexto-${theme} sm:text-base gap-y-60 inter bg-clip-text text-transparent break-words`}
            >
              Have you ever thought about gathering all relevant information
              about a user in one place? <br />
              Here, you have it all in a very simple way... Just enter the
              profile link and search!
            </p>
          </div>

          {/* Barra de pesquisa */}
          <div className="pt-32">
            <div className="mt-4 shadow-2xl w-full border-2 rounded-lg border-purple-500  lg:w-2/3 md:w-2/3 sm:w-full h-14 flex">
              <input
                onChange={change}
                type="text"
                placeholder="Enter with steam url, steam64 ID, steam3 ID, steam2 ID..."
                className={`w-full corInput-${theme} pl-4 rounded-l-lg focus:ring-0 focus:outline-none bg-transparent text-white placeholder-gray-400 text-xs sm:text-sm`}
              />
              <button
                className="w-16 shadow-lg shadow-purple-500/50 hover:bg-purple-500 duration-300 flex items-center justify-center bg-transparent"
                onClick={() => {
                  validacao();
                }}
              >
                <SearchIcon src={searchButton} alt="Search icon" className={`buttomColor-${theme}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Search;