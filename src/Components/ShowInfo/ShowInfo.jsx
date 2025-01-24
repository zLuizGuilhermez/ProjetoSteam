import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowInfo.css";
import searchButton from "../../assets/search-w.png";
import Skeleton from "@mui/material/Skeleton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

const ShowInfo = ({ id, Componente, theme }) => {
  const [info, setInfo] = useState(null);
  const [idNew, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const copy = (value) => {
    navigator.clipboard.writeText(value);
  };

  const fetchInfo = async (id) => {
    try {
      setLoading(true);
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

  useEffect(() => {
    if (id && id.length === 17 && !isNaN(id)) {
      fetchInfo(id);
    }
  }, [id]);

  if (Componente === "new") {
    return (
      <div className="border shadow-2xl w-2/3 h-full border-2 border-gray-500 flex flex-col rounded-lg gap-4 p-6 sm:p-12 bg-transparent content-around mb-9">
        <div className="flex justify-center items-center h-14">
          <div className="shadow-2xl w-1/2 h-14 flex justify-center items-center">
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="https://steamcommunity.com/id/example..."
              className={`w-full corInput-${theme} pl-4 border h-9 border-purple-500 rounded-l-lg focus:ring-0 focus:outline-none text-white bg-transparent s placeholder-gray-400 text-xs sm:text-sm`}
            />
            <button
              className="w-16 border border-purple-500 shadow-lg h-9 shadow-purple-500/50 hover:bg-purple-500 duration-300 rounded-r-lg flex items-center justify-center bg-transparent"
              onClick={() => {
                if (idNew) fetchInfo(idNew);
              }}
            >
              <img src={searchButton} alt="Search icon" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center h-96 rounded-md">
          {loading ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height="100%" // Ajuste a altura conforme necessário
              animation="wave"
              sx={{
                bgcolor: "grey.900",
                "::after": {
                  bgcolor: "rgba(128, 0, 128, 0.3)",
                },
              }}
            />
          ) : info ? (
            <div className=" w-full h-full">
              <video
                src={info.background}
                loop
                autoPlay
                className="w-full h-full object-cover border-2 border-gray-500 rounded-md"
              />
              <div
                className="relative justify-center flex mr-96"
                style={{ marginTop: "-7%", paddingLeft: "0%" }}
              >
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%" // Ajuste a altura conforme necessário
                    animation="wave"
                    sx={{
                      bgcolor: "grey.900",
                      "::after": {
                        bgcolor: "rgba(128, 0, 128, 0.3)",
                      },
                    }}
                  />
                ) : info ? (
                  <img
                    className="w-1/5 z-10 border-2 border-gray-500 h-1/2 object-cover rounded-lg"
                    src={info.avatarfull}
                    alt="Steam Avatar"
                  />
                ) : null}
                {info.personaname && (
                  <p className="flex items-center pl-6 pt-9 text-white text-center mt-2 font-semibold">
                    {info.personaname}
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="gap-6 mt-24 grid grid-cols-2">
          <div>
            <div className="flex flex-col justify-around bg-custom-purple shadow-purple-500/50 p-5 shadow-md rounded-md">
              <div className="flex items-center justify-center text-white">
                <p className="inter pr-3">Steam IDs</p>
                <ApiOutlinedIcon />
              </div>
              <div className="flex h-64 mt-2 flex-col gap-2 ">
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%" // Ajuste a altura conforme necessário
                    animation="wave"
                    sx={{
                      bgcolor: "grey.900",
                      "::after": {
                        bgcolor: "rgba(128, 0, 128, 0.3)",
                      },
                    }}
                  />
                ) : info ? (
                  <div className="flex flex-col justify-around gap-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-9 justify-around bg-custom-purple shadow-purple-500/50 p-5 shadow-md rounded-md">
              <div className="flex items-center justify-center text-white">
                <p className="inter pr-3">Ban Condition</p>
                <ApiOutlinedIcon />
              </div>
              <div className="h-56 mt-2 flex flex-col gap-2">
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%"
                    animation="wave"
                    sx={{
                      bgcolor: "grey.900",
                      "::after": {
                        bgcolor: "rgba(128, 0, 128, 0.3)",
                      },
                    }}
                  />
                ) : (
                  <div className="flex flex-col justify-around gap-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">Steam ID</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{info?.steamid}</span>
                      </div>
                      <div
                        className="cursor-pointer p-2"
                        onClick={() => copy(info?.steamid)}
                      >
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </div>
                    </div>
                  
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-around bg-custom-purple shadow-purple-500/50 p-5 shadow-md rounded-md">
              <div className="flex items-center justify-center text-white">
                <p className="inter pr-3">Played Hours</p>
                <AccessTimeIcon />
              </div>
              {loading ? (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={40}
                  animation="wave"
                  sx={{
                    bgcolor: "grey.900",
                    "::after": {
                      bgcolor: "rgba(128, 0, 128, 0.3)",
                    },
                  }}
                />
              ) : (
                [
                  { label: "Total Hours", value: info?.totalHours },
                  { label: "Game Hours", value: info?.gameHours },
                ].map((item, index) => (
                  <div className="mt-2" key={index}>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/2 border-r p-2 border-gray-500">
                        <p className="text-white interCampo">{item.label}</p>
                      </div>
                      <div className="w-2/3 flex-1 p-2 border-r border-gray-500">
                        <span className="text-white">{item.value}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ShowInfo;
