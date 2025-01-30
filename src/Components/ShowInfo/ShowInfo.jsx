import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowInfo.css";
import searchButton from "../../assets/search-w.png";
import Skeleton from "@mui/material/Skeleton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

const ShowInfo = ({ id, Componente, theme }) => {
  const [info, setInfo] = useState({});
  const [idNew, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [vacStatus, setVacStatus] = useState("");
  const [PlayerLevel, setPlayerlevel] = useState("");
  const [tooltipCopy, setToolTipCopy] = useState(0);

  const toolTipChange = (status) => {
    tooltipCopy === 0 ? setToolTipCopy(1) : setToolTipCopy(0);
  };

  const toolTipChangeAwait = () => {
    setTimeout(() => setToolTipCopy(0), 1000);
  };

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

      const responseVac = await axios.get(
        `http://localhost:8080/api/infoController/toGetBanList/${id}`
      );

      const responseLevel = await axios.get(
        `http://localhost:8080/api/infoController/toGetPlayerLevel/${id}`
      );

      setVacStatus(responseVac.data);
      setPlayerlevel(responseLevel.data);
      setInfo(response.data);
      setBackgroundStatus(response.status);
    } catch (error) {
      console.error("Erro ao buscar informações:", error);
    } finally {
      setLoading(false);
    }
  };

  const foundID = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/infoController/toChangeUrlToId/${id}`
      );

      const steamID = response.data.steamid.replace(/'/g, "");

      fetchInfo(steamID);
    } catch (error) {
      console.error("Erro ao buscar ID:", error);
    }
  };

  useEffect(() => {
    if (id && id.length === 17 && Number(id)) {
      console.log("Fetching info for ID:", id);
      fetchInfo(id);
    } else if (id && id.length < 17) {
      console.log("Found ID for URL:", id);

      foundID(id);
    }
  }, [id]);

  if (Componente === "new") {
    return (
      <div className="border shadow-2xl  lg:w-2/3 sm:w-3/4 h-full border-2 border-gray-500 flex flex-col rounded-lg gap-4 md:p-4 g:p-6 sm:p-3 bg-transparent content-around mb-9">
        <div className="flex justify-center items-center h-14">
          <div className="shadow-2xl w-1/2 h-14 flex justify-center items-center">
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
                    if (idNew) fetchInfo(idNew);
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
        <div className="flex justify-center  hover:bg-purple-500 h-96 rounded-md">
          {loading ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.900" }}
            />
          ) : info && info.status === 1 ? (
            <div className="w-full h-full relative">
              <video
                src={info.background}
                loop
                autoPlay
                className="w-full h-full object-cover border-2 border-gray-500 rounded-md"
              />
              <div className="transform flex items-center gap-4">
                <img
                  className="absolute w-36 h-36 mb-16 ml-9 border-2 border-gray-500 object-cover rounded-lg"
                  src={info.avatarfull}
                  alt="Steam Avatar"
                />
                <div className="flex">
                  <div className="">
                    {info.personaname && (
                      <p className="text-neutral-300 ml-48 text-lg font-semibold">
                        {info.personaname}
                      </p>
                    )}
                    <div className="flex">
                      <div className="ml-48  ">
                        <p className=" text-base font-semibold text-neutral-300">
                          Level
                        </p>
                      </div>
                      <div className=" ml-2 rounded-xl w-6 flex justify-center border ">
                        <div className="text-neutral-300 text-sm ">
                          {PlayerLevel.player_level}
                        </div>
                      </div>
                    </div>
                    <div className="ml-48 mt-1 h-6 w-6">
                      <img
                        className=" border-2 border-gray-500 h-full w- rounded-xl"
                        src={info.flagUrL}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : info && info.status === 2 ? (
            <div className="w-full h-full relative">
              <img
                src={info.background}
                loop
                autoPlay
                className="w-full h-full object-cover border-2 border-gray-500 rounded-md"
              ></img>
              <div className="transform flex items-center gap-4">
                <img
                  className="absolute w-36 h-36 mb-16 ml-9 border-2 border-gray-500 object-cover rounded-lg"
                  src={info.avatarfull}
                  alt="Steam Avatar"
                />
                <div className="flex">
                  <div className="">
                    {info.personaname && (
                      <p className="text-neutral-300 ml-48 text-lg font-semibold">
                        {info.personaname}
                      </p>
                    )}
                    <div className="flex">
                      <div className="ml-48  ">
                        <p className=" text-base font-semibold text-neutral-300">
                          Level
                        </p>
                      </div>
                      <div className=" ml-2 rounded-xl w-6 flex justify-center border ">
                        <div className="text-neutral-300 text-sm ">
                          {PlayerLevel.player_level}
                        </div>
                      </div>
                    </div>
                    <div className="ml-48 mt-1 h-6 w-6">
                      <img
                        className=" border-2 border-gray-500 h-full w- rounded-xl"
                        src={info.flagUrL}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="gap-6 mt-24 grid lg:grid-cols-2 lg:text-lg md:text-sm sm:text-xs sm:grid-cols-1">
          <div className="">
            <div className="flex flex-col justify-around bg-custom-purple shadow-purple-500/50 p-5 shadow-sm rounded-md">
              <div className="flex items-center justify-center text-neutral-300">
                <p className="inter text-xl pr-3">Steam IDs</p>
                <ApiOutlinedIcon />
              </div>
              <div className="flex lg:h-72 sm:h-76 mt-2 flex-col gap-2">
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%" // Ajuste a altura conforme necessário
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                  />
                ) : info ? (
                  <div className="flex flex-col h-full justify-around gap-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-neutral-300 lg:text-base inter">
                          Steam ID
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-custom-campos duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="inter lg:text-base text-neutral-300">
                          {info?.steamid}
                        </span>
                      </div>

                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamid),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [copy(info?.steamid), toolTipChange()]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className=" lg:text-base text-neutral-300 inter">
                          Account ID
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-custom-campos duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className=" lg:text-base inter text-neutral-300">
                          {info.accountId}
                        </span>
                      </div>
                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.accountId),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [copy(info?.accountId), toolTipChange()]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-neutral-300 inter">
                          Steam2 ID
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-custom-campos duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="lg:text-base inter text-neutral-300">
                          {info.steamId2}
                        </span>
                      </div>
                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamId2),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [copy(info?.steamId2), toolTipChange()]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-neutral-300 inter">
                          Steam3 ID
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-custom-campos duration-150 hover:bg-custom-campos duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="lg:text-base text-neutral-300 inter">
                          <a
                            href={`http://steamcommunity.com/profiles/[${info.steamId3}]`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {info.steamId3}
                          </a>
                        </span>
                      </div>
                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamId3),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [copy(info?.steamId3), toolTipChange()]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex  justify-between border rounded-md border-gray-500">
                      <div className="w-1/3  border-r p-2 border-gray-500">
                        <p className="lg:text-base text-neutral-300 inter">
                          Steam HEX
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-custom-campos duration-150 hover:bg-custom-campos duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="lg:text-base inter text-neutral-300">
                          {info?.steamid}
                        </span>
                      </div>
                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamid),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [copy(info?.steamid), toolTipChange()]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col mt-6 sm:h- justify-around bg-custom-purple shadow-purple-500/50 p-5 shadow-sm rounded-md">
              <div className="flex items-center justify-center text-neutral-300">
                <p className="text-xl inter pr-3">Ban Situation</p>
                <GppMaybeOutlinedIcon />
              </div>
              <div className="flex lg:h-56 sm:h-56 mt-2 flex-col gap-2">
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%" // Ajuste a altura conforme necessário
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                  />
                ) : info ? (
                  <div className="flex flex-col h-full justify-around gap-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-neutral-300 inter">
                          Vac Ban
                        </p>
                      </div>

                      {vacStatus.VACBanned === true ? (
                        <div className="w-2/3 hover:bg-red-600 rounded-r-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base text-neutral-300 inter ">
                              {vacStatus.NumberOfVACBans} Vac Ban (
                              {vacStatus.DaysSinceLastBan}) days ago
                            </span>

                            <GppMaybeOutlinedIcon className="text-red-800"></GppMaybeOutlinedIcon>
                          </div>
                        </div>
                      ) : (
                        <div className="w-2/3  hover:bg-custom-campos rounded-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-neutral-300"></GppGoodOutlinedIcon>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-neutral-300 inter">
                          Game Ban
                        </p>
                      </div>
                      {vacStatus.NumberOfGameBans === 0 ? (
                        <div className="w-2/3 hover:bg-custom-campos rounded-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-neutral-300" />
                          </div>
                        </div>
                      ) : vacStatus.NumberOfGameBans === 1 ? (
                        <div className="w-2/3 hover:bg-red-600 rounded-r-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-neutral-300">
                              {vacStatus.NumberOfGameBans} Game Banned
                            </span>
                            <GppMaybeOutlinedIcon className="text-red-800" />
                          </div>
                        </div>
                      ) : vacStatus.NumberOfGameBans > 1 ? (
                        <div className="w-2/3 hover:bg-red-600 rounded-r-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-neutral-300">
                              {vacStatus.NumberOfGameBans} Games Banned
                            </span>
                            <GppMaybeOutlinedIcon className="text-red-800" />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base inter text-neutral-300">
                          Comm. Ban
                        </p>
                      </div>
                      <div className="w-2/3  hover:bg-custom-campos rounded-md duration-150 flex-1 p-2">
                        {vacStatus.CommunityBanned == false ? (
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-neutral-300"></GppGoodOutlinedIcon>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-neutral-300">
                              Not Good Situation
                            </span>
                            <GppMaybeOutlinedIcon className="text-neutral-300"></GppMaybeOutlinedIcon>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-neutral-300 inter">
                          Trade Ban
                        </p>
                      </div>
                      <div className="w-2/3  hover:bg-custom-campos rounded-md duration-150 flex-1 p-2">
                        {vacStatus.EconomyBan == "none" ? (
                          <div className="flex justify-between">
                            <span className="lg:text-base text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-neutral-300"></GppGoodOutlinedIcon>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="lg:text-base text-neutral-300">
                              Not Good Situation
                            </span>
                            <GppMaybeOutlinedIcon className="text-neutral-300"></GppMaybeOutlinedIcon>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col h-48 mb-3 justify-around bg-custom-purple lg:text-lg sm:text-sm shadow-purple-500/50 p-5 shadow-sm rounded-md">
              <div className="flex items-center justify-center text-neutral-300">
                <p className="text-xl inter pr-3">Played Hours</p>
                <AccessTimeIcon />
              </div>
              {loading ? (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                />
              ) : (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex justify-between border rounded-md border-gray-500">
                    <div className="w-1/2 border-r p-2 border-gray-500">
                      <p className="text-neutral-300 inter">Total Hours</p>
                    </div>
                    <div className="w-2/3 hover:bg-custom-campos duration-150 flex-1 p-2 border-gray-500">
                      <span className="text-neutral-300"></span>
                    </div>
                  </div>
                  <div className="flex justify-between border rounded-md border-gray-500">
                    <div className="w-1/2 border-r p-2 border-gray-500">
                      <p className="text-neutral-300 inter">Total Hours</p>
                    </div>
                    <div className="w-2/3 hover:bg-custom-campos duration-150 flex-1 p-2 border-gray-500">
                      <span className="text-neutral-300"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default React.memo(ShowInfo);
