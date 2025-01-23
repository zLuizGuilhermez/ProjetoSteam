import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowInfo.css";
import searchButton from "../../assets/search-w.png";
import Skeleton from "@mui/material/Skeleton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";

const ShowInfo = ({ id, Componente, theme }) => {
  const [info, setInfo] = useState(null); // Estado para armazenar a resposta da API
  const [idNew, setId] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  // Função para atualizar o ID do input
  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const copy = (value) => {
    navigator.clipboard.writeText(value);
  };

  // Função para buscar os dados da API
  const fetchInfo = async (id) => {
    try {
      setLoading(true); // Inicia o carregamento
      const response = await axios.get(
        `http://localhost:8080/api/infoController/toInfoService/${id}`
      );
      console.log("Resposta da API:", response.data);
      setInfo(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para buscar os dados quando o ID é válido
  useEffect(() => {
    if (id && id.length === 17 && !isNaN(id)) {
      fetchInfo(id);
    }
  }, [id]);

  // Renderização do componente
  if (Componente === "new") {
    return (
      <div className="w-full max-w-6xl mx-auto lg:mx-0 flex items-center px-4 sm:px-24 lg:px-0">
        <div className="border shadow-2xl border-2 border-gray-500 flex flex-col rounded-lg gap-4 h-full w-full relative p-6 sm:p-12 bg-transparent content-around">
          <div className="flex justify-center items-center h-14">
            <div className="shadow-2xl w-1/2 h-14 flex justify-center items-center">
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="https://steamcommunity.com/id/example..."
                className={`w-full corInput-${theme} pl-4 border h-9 border-purple-500 rounded-l-lg focus:ring-0 focus:outline-none bg-transparent text-white placeholder-gray-400 text-xs sm:text-sm`}
              />
              <button
                className="w-16 border border-purple-500 shadow-lg h-9 shadow-purple-500/50 hover:bg-purple-500 duration-300 rounded-r-lg flex items-center justify-center bg-transparent"
                onClick={() => {
                  if (idNew) fetchInfo(idNew); // Busca informações com o ID do input
                }}
              >
                <img src={searchButton} alt="Search icon" className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex flex-col h-full justify-evenly gap-4">
            {/* Renderização condicional */}
            <div className="flex justify-center h-1/3 rounded-md">
              <div className="relative w-full h-full">
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%"
                    animation="wave"
                    sx={{
                      bgcolor: "grey.900", // Fundo branco
                      "::after": {
                        bgcolor: "rgba(128, 0, 128, 0.3)", // Gradiente escuro para a animação
                      },
                    }}
                  />
                ) : info ? (
                  <div className="relative w-full h-full">
                    <video
                      src={info.background}
                      loop
                      autoPlay
                      className="w-full h-full object-cover border-2 border-gray-500 rounded-md"
                    />
                    {/* Nova div para a imagem */}
                    <div
                      className="relative justify-center flex mr-96"
                      style={{
                        marginTop: "-7%", // Ajusta para a imagem ficar "metade dentro"
                        paddingLeft: "0%", // Descola a imagem da esquerda
                      }}
                    >
                      <img
                        className="w-1/5 z-10 border-2 border-gray-500 h-1/2 object-cover rounded-lg"
                        src={info.avatarfull}
                        alt="Steam Avatar"
                      />
                      {info.personaname && (
                        <p className="flex items-center pl-6 pt-9 text-white text-center mt-2 font-semibold">
                          {info.personaname}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/*mostrar as informações*/}
            <div className="gap-4 grid grid-cols-2 mt-24 h-2/3 ">
              <div className="">
                <div className="h-1/2 flex flex-col justify-around bg-custom-purple shadow-purple-500/50 p-5 shadow-lg inset-shadow-2xs inset-shadow-indigo-500 rounded-md">
                  <div className="flex flex-col items-center justify-around text-white">
                    <p className="inter">Steam IDs</p>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className=" w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className=" w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">adadadaaaaaaaaaaa</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info.personaname)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className=" w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Account ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">adadadaaaaaaaaaaa</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info.personaname)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Url</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">adadadaaaaaaaaaaa</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info.personaname)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam2 ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">adadadaaaaaaaaaaa</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info.personaname)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className=" w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam3 ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">adadadaaaaaaaaaaa</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info.personaname)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                  </div>

                  
                </div>
                <div></div>
              </div>
              <div>
                <p>oi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ShowInfo;
