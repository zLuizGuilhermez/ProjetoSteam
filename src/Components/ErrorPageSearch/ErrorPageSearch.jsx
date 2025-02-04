import React, { useState, useEffect } from "react";
import "./ErrorPageSearch.css";
import searchButton from "../../assets/search-w.png";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

const ErrorPageSearch = ({theme, saveid, trocarComponente}) =>{

    const [forValidation,setForValidation] = useState("");
    const [id, setid] = useState("");
  
    //muda o estado do input
    const handleInputChange = (event) => {
      setForValidation(event.target.value);
    };
  
    //verifica se existe um usuario com esse id
    const verifyInfo = async (idNow) => {
      try{
  
        const response = await axios.get(
          `http://localhost:8080/api/infoController/toInfoService/${idNow}`
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
          `http://localhost:8080/api/infoController/toChangeUrlToId/${id}`
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
      }else if(forValidation && forValidation.length >= 27 && forValidation.startsWith("https://steamcommunity.com/")){;
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
    

    return(
        <div className="w-2/3 flex items-center flex-col justify-center rounded-lg bg-transparent shadow-2xl p-4 text-white h-28">
        <div className=" ">
          <span className={`corTexto-${theme} lg:text-lg sm:text-sm md:text-lg font-semibold`}>
            User not find. Please try again.
          </span>   
          </div>

          <div className="flex justify-center items-center h-14">
          <div className="shadow-2xl lg:w-96 md:w-96 sm:w-1/2 h-14 flex justify-center items-center">
            <div className="border-2 w-full flex border-purple-500 rounded-md">
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="Enter with steam url, steam64 ID, steam3 ID, steam2 ID..."
                className={`w-full corInput-${theme} pl-4 h-9 rounded-l-lg focus:ring-0 focus:outline-none text-neutral-300 bg-transparent s placeholder-gray-400 text-xs sm:text-sm`}
              />
              <Tooltip title="Search" placement="right-start">
                <Button
                  className=""
                  sx={{
                    color: "purple",
                    "&:hover": {
                      borderColor: "purple", // Cor da borda ao passar o mouse
                    },
                  }}
                  onClick={() => {
                    validacao();
                  }}
                >
                  <img
                    src={searchButton}
                    alt="Search icon"
                    className="w-6 h-6"
                  />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        </div>
    );
};

export default ErrorPageSearch;