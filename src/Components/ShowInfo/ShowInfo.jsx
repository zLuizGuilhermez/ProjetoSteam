import React, { useState, useEffect } from 'react';
import './ShowInfo.css';
import axios from 'axios';

const ShowInfo = ({ id }) => {
    const [info, setInfo] = useState(null);
    const [status, setStatus] = useState(1); // 1 = Aguardando busca, 2 = Sucesso, 3 = Erro

    useEffect(() => {
        if (id && id.length === 17 && !isNaN(id)) {
            fetchInfo(id);
        }
    }, [id]);

    const fetchInfo = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/infoController/toInfoService/${id}`);
            setInfo(response.data);
            setStatus(2); // Sucesso
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            setStatus(3); // Erro
        }
    };

    return (
        <div className={`pt-6 items-center flex justify-center real-container status-${status}`}>
          <div className="rounded-lg w-full sm:w-2/3 bg-white flex flex-col justify-around items-center shadow-lg pb-12">
            {status === 1 && (
              <>
                <div className="gap-10 flex justify-center bg-indigo-500 rounded-b-lg p-0.5 shadow-md w-full sm:w-1/2">
                  <h1 className="text-sm sm:text-lg">Steam Info Finder</h1>
                </div>
                <div>
                  <h2 className="pt-6 text-xs sm:text-base">
                    Search your Steam info is easy. Just enter your SteamID or profile URL.
                  </h2>
                </div>
              </>
            )}
      
            {status === 2 && info && (
              <>
                <div className="pt-2 w-full sm:w-3/4">
                  <div className="h-80 sm:h-96 flex relative">
                    <video
                      className="w-full h-full object-cover rounded-md"
                      autoPlay
                      loop
                      src={info.background}
                      
                      alt="Steam Video"
                    />
                    <img
                      className="absolute w-32 h-32 border-white -bottom-12 left-4 shadow-md"
                      src={info.avatarfull}
                      alt="Steam Avatar"
                    />
                  </div>
                  <div className="flex justify-center w-12 relative left-44">
                    <p className="text-xs sm:text-sm font-bold">{info.personaname}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );s
};

export default ShowInfo;
