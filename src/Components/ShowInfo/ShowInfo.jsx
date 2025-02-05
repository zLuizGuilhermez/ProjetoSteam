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
import SearchIcon from '@mui/icons-material/Search';

const ShowInfo = ({ id, Componente, theme, trocarComponente }) => {
  const [info, setInfo] = useState({});
  const [forValidation, setForValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const [vacStatus, setVacStatus] = useState("");
  const [PlayerLevel, setPlayerlevel] = useState("");
  const [tooltipCopy, setToolTipCopy] = useState(0);
  const [hoursPlayed, setHoursPlayed] = useState("");

  //função para mudar o estado do tooltip
  const toolTipChange = (status) => {
    tooltipCopy === 0 ? setToolTipCopy(1) : setToolTipCopy(0);
  };

  //função para mudar o estado do tooltip
  const toolTipChangeAwait = () => {
    setTimeout(() => setToolTipCopy(0), 1000);
  };

  //função para mudar o estado do id
  const handleInputChange = (event) => {
    setForValidation(event.target.value);
  };

  //função para copiar o texto
  const copy = (value) => {
    navigator.clipboard.writeText(value);
  };

  //função para buscar informações do usuário
  const fetchInfo = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backendsteamproject-production.up.railway.app/api/infoController/toInfoService/${id}`
      );

      const responseVac = await axios.get(
        `https://backendsteamproject-production.up.railway.app/api/infoController/toGetBanList/${id}`
      );

      const responseLevel = await axios.get(
        `https://backendsteamproject-production.up.railway.app/api/infoController/toGetPlayerLevel/${id}`
      );

      let responseHours = { data: null };

      if (response.data.communityvisibilitystate !== "1") {
        responseHours = await axios.get(
          `https://backendsteamproject-production.up.railway.app/api/infoController/toGetHoursPlayed/${id}`
        );
        setHoursPlayed(responseHours.data);
      }

      setVacStatus(responseVac.data);
      setPlayerlevel(responseLevel.data);
      setInfo(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações:", error);
    } finally {
      setLoading(false);
    }
  };

  //busca o id que aquele nome de url esta relacionado
  const foundID = async (id) => {
    try {
      const response = await axios.get(
        `https://backendsteamproject-production.up.railway.app/api/infoController/toChangeUrlToId/${id}`
      );

      const steamID = response.data.steamid.replace(/'/g, "");

      fetchInfo(steamID);
    } catch (error) {
      console.error("Erro ao buscar ID:", error);
    }
  };

  //passivo para chamar a função de buscar informações ou ID
  useEffect(() => {
    if (id && id.length === 17 && Number(id)) {
      console.log("Fetching info for ID:", id);
      fetchInfo(id);
    } else if (id && id.length < 17) {
      console.log("Found ID for URL:", id);

      foundID(id);
    }
  }, [id]);

  const verifyInfo = async (idNow) => {
    try {
      const response = await axios.get(
        `https://backendsteamproject-production.up.railway.app/api/infoController/toInfoService/${idNow}`
      );

      if (response.data !== null) {
        fetchInfo(idNow);
        trocarComponente("new");
      }
    } catch (error) {
      console.log("deu erro");
      if (error.response.status === 500) {
        trocarComponente("error");
      }
    }
  };

  //filtra o nome do url

  const inputFilter = () => {
    if (forValidation.includes("https://steamcommunity.com/id/")) {
      const extracted = forValidation.split("/id/")[1].split("/")[0];
      foundIdByUrl(extracted);
    } else if (forValidation.includes("https://steamcommunity.com/profiles/")) {
      const extracted = forValidation.split("/profiles/")[1].split("/")[0];
      foundIdByUrl(extracted);
    }
  };

  //verifica se existe alguma pessoa com esse nome de url
  const foundIdByUrl = async (id) => {
    try {
      const response = await axios.get(
        `https://backendsteamproject-production.up.railway.app/api/infoController/toChangeUrlToId/${id}`
      );

      if (response.data.success === 1) {
        fetchInfo(response.data.steamid);
        trocarComponente("new");
      }
    } catch (error) {
      console.log("deu erro");
      if (error.response.status === 404) {
        trocarComponente("error");
      }
    }
  };

  // transforma o id2 para 64
  const id2To64 = () => {
    const STEAM64_BASE = 76561197960265728n;

    const match = forValidation.match(/^STEAM_\d:(\d):(\d+)$/);
    if (!match) throw new Error("Formato inválido de Steam2ID");

    const Y = BigInt(parseInt(match[1], 10));
    const accountID = BigInt(parseInt(match[2], 10));

    const steamID32 = accountID * 2n + Y;

    const result = (steamID32 + STEAM64_BASE).toString();

    fetchInfo(result);
  };

  //transforma o id3 para 64
  const id3To64 = () => {
    const STEAM64_BASE = 76561197960265728n;

    if (forValidation.startsWith("[U:")) {
      const match = forValidation.match(/^\[U:1:(\d+)\]$/);

      const accountID = BigInt(match[1]); // Extrai o AccountID como BigInt

      // Calcula o Steam64 ID
      const result = (accountID + STEAM64_BASE).toString(); // Converte para String

      verifyInfo(result);
    } else if (forValidation.startsWith("U:")) {
      const match = forValidation.match(/^U:1:(\d+)$/);

      const accountID = BigInt(match[1]); // Extrai o AccountID como BigInt

      // Calcula o Steam64 ID
      const result = (accountID + STEAM64_BASE).toString(); // Converte para String

      fetchInfo(result);
    }
  };

  //recebe o id ou url e valida
  const validacao = () => {
    if (forValidation && forValidation.length === 17 && !isNaN(forValidation)) {
      verifyInfo(forValidation);
    } else if (
      forValidation &&
      forValidation.length >= 27 &&
      forValidation.startsWith("https")
    ) {
      inputFilter(id);
    } else if (forValidation.startsWith("STEAM_")) {
      id2To64(forValidation);
    } else if (forValidation.startsWith("[U:")) {
      id3To64(forValidation);
    } else if (forValidation.startsWith("U:")) {
      id3To64(forValidation);
    } else if (forValidation && forValidation.length < 17) {
      foundIdByUrl(forValidation);
    }
  };

  if (Componente === "new") {
    return (
      <div className="border shadow-2xl  lg:w-2/3 sm:w-3/4 h-full border-2 border-gray-500 flex flex-col rounded-lg gap-4 md:p-4 g:p-6 sm:p-3 bg-transparent content-around mb-9">
        <div className="flex justify-center items-center h-14">
          <div className=" dark:bg-custom-black duration-300 bg-slate-200 w-1/2 h-14 flex justify-center items-center">
            <div className="border-2 w-full flex border-purple-500 rounded-md">
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="Enter with steam url, steam64 ID, steam3 ID, steam2 ID..."
                className={`w-full corInput-${theme} pl-4 h-9 rounded-l-lg focus:ring-0 focus:outline-none text-dark dark:text-neutral-300 bg-transparent s placeholder-gray-400 text-xs sm:text-sm`}
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
                  <SearchIcon
                    src={searchButton}
                    alt="Search icon"
                    id={`searchButton-${theme}`}
                    className={`w-6 h-6`}
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
                      <p className="text-black dark:text-dark dark:text-neutral-300 ml-48 text-lg font-semibold">
                        {info.personaname}
                      </p>
                    )}
                    {info.communityvisibilitystate === "3" ? (
                      <div className="flex">
                        <div className="ml-48  ">
                          <p className="text-base font-semibold text-black dark:text-dark dark:text-neutral-300 ">
                            Level
                          </p>
                        </div>
                        <div className=" ml-2 items-center rounded-xl w-6 flex justify-center border border-black dark:border-white ">
                          <div className="text-black dark:text-neutral-300 text-xs ">
                            {PlayerLevel.player_level}
                          </div>
                        </div>
                      </div>
                    ) : info.communityvisibilitystate === "1" ? (
                      <div className="flex">
                        <div className="ml-48  ">
                          <p className=" text-base font-semibold text-red-700">
                            Private Profile
                          </p>
                          </div>
                      </div>
                    ) : null}
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
            <div className="flex flex-col justify-around bg-gray-300 duration-300 dark:bg-custom-purple shadow-purple-500/50 p-5 shadow-sm rounded-md">
              <div className="flex items-center justify-center text-black dark:text-neutral-300">
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
                  <div className="flex flex-col h-full justify-between gap-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="text-dark dark:text-neutral-300 lg:text-base inter">
                          Steam ID
                        </p>
                      </div>
                      <div className="w-2/3 dark:hover:bg-custom-campos hover:bg-gray-400 duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="inter lg:text-base text-dark dark:text-neutral-300">
                          {info?.steamid}
                        </span>
                      </div>

                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamid),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 rounded-md cursor-pointer p-2"
                          onClick={() => [copy(info?.steamid), toolTipChange()]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className=" lg:text-base text-dark dark:text-neutral-300 inter">
                          Account ID
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className=" lg:text-base inter text-dark dark:text-neutral-300">
                          {info.accountId}
                        </span>
                      </div>
                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150  cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.accountId),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150  cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.accountId),
                            toolTipChange(),
                          ]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-dark dark:text-neutral-300 inter">
                          Steam2 ID
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="lg:text-base inter text-dark dark:text-neutral-300">
                          {info.steamId2}
                        </span>
                      </div>
                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamId2),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamId2),
                            toolTipChange(),
                          ]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-dark dark:text-neutral-300 inter">
                          Steam3 ID
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="lg:text-base text-dark dark:text-neutral-300 inter">
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
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamId3),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamId3),
                            toolTipChange(),
                          ]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex  justify-between border rounded-md border-gray-500">
                      <div className="w-1/3  border-r p-2 border-gray-500">
                        <p className="lg:text-base text-dark dark:text-neutral-300 inter">
                          Steam HEX
                        </p>
                      </div>
                      <div className="w-2/3 hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 duration-150 flex-1 p-2 border-r border-gray-500">
                        <span className="lg:text-base inter text-dark dark:text-neutral-300">
                          {info?.steamid}
                        </span>
                      </div>
                      {tooltipCopy === 0 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 cursor-pointer p-2"
                          onClick={() => [
                            copy(info?.steamid),
                            toolTipChange(),
                            toolTipChangeAwait(),
                          ]}
                        >
                          <Tooltip title="Copy" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : tooltipCopy === 1 ? (
                        <div
                          className="hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 cursor-pointer p-2"
                          onClick={() => [copy(info?.steamid), toolTipChange()]}
                        >
                          <Tooltip title="Copied" placement="right">
                            <ContentCopyIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col mt-6 sm:h- justify-around duration-300 dark:bg-custom-purple bg-gray-300 shadow-purple-500/50 p-5 shadow-sm rounded-md">
              <div className="flex items-center justify-center text-dark dark:text-neutral-300">
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
                        <p className="lg:text-base text-dark dark:text-neutral-300 inter">
                          Vac Ban
                        </p>
                      </div>

                      {vacStatus.VACBanned === true ? (
                        <div className="w-2/3 hover:bg-red-600 rounded-r-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base text-dark dark:text-neutral-300 inter ">
                              {vacStatus.NumberOfVACBans} Vac Ban (
                              {vacStatus.DaysSinceLastBan}) days ago
                            </span>

                            <GppMaybeOutlinedIcon className="text-red-800"></GppMaybeOutlinedIcon>
                          </div>
                        </div>
                      ) : (
                        <div className="w-2/3 dark:rounded-md hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-dark dark:text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-dark dark:text-neutral-300"></GppGoodOutlinedIcon>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between border rounded-md  border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-dark dark:text-neutral-300 inter">
                          Game Ban
                        </p>
                      </div>
                      {vacStatus.NumberOfGameBans === 0 ? (
                        <div className="w-2/3 dark:rounded-md hover:bg-gray-400 dark:hover:bg-custom-campos duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-dark dark:text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-dark dark:text-neutral-300" />
                          </div>
                        </div>
                      ) : vacStatus.NumberOfGameBans === 1 ? (
                        <div className="w-2/3 hover:bg-red-600 rounded-r-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-dark dark:text-neutral-300">
                              {vacStatus.NumberOfGameBans} Game Banned
                            </span>
                            <GppMaybeOutlinedIcon className="text-red-800" />
                          </div>
                        </div>
                      ) : vacStatus.NumberOfGameBans > 1 ? (
                        <div className="w-2/3 hover:bg-red-600 rounded-r-md duration-150 flex-1 p-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-dark dark:text-neutral-300">
                              {vacStatus.NumberOfGameBans} Games Banned
                            </span>
                            <GppMaybeOutlinedIcon className="text-red-800" />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base inter text-dark dark:text-neutral-300">
                          Comm. Ban
                        </p>
                      </div>
                      <div className="w-2/3 dark:rounded-md  hover:bg-gray-400 dark:hover:bg-custom-campos  duration-150 flex-1 p-2">
                        {vacStatus.CommunityBanned == false ? (
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-dark dark:text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-dark dark:text-neutral-300"></GppGoodOutlinedIcon>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-dark dark:text-neutral-300">
                              Not Good Situation
                            </span>
                            <GppMaybeOutlinedIcon className="text-dark dark:text-neutral-300"></GppMaybeOutlinedIcon>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-dark dark:text-neutral-300 inter">
                          Trade Ban
                        </p>
                      </div>
                      <div className="w-2/3  hover:bg-gray-400 dark:hover:bg-custom-campos dark:rounded-md duration-150 flex-1 p-2">
                        {vacStatus.EconomyBan == "none" ? (
                          <div className="flex justify-between">
                            <span className="lg:text-base inter text-dark dark:text-neutral-300">
                              Good Situation
                            </span>
                            <GppGoodOutlinedIcon className="text-dark dark:text-neutral-300"></GppGoodOutlinedIcon>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="lg:text-base text-dark dark:text-neutral-300">
                              Not Good Situation
                            </span>
                            <GppMaybeOutlinedIcon className="text-dark dark:text-neutral-300"></GppMaybeOutlinedIcon>
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
            <div className="flex flex-col sm:h- justify-between duration-300 dark:bg-custom-purple bg-gray-300 shadow-purple-500/50 p-5 shadow-sm rounded-md">
              <div className="flex items-center justify-center text-dark dark:text-neutral-300">
                <p className="text-xl inter pr-3">Played Hours</p>
                <AccessTimeIcon />
              </div>
              <div className="flex lg:h-44 sm:h-44 mt-2 flex-col gap-2">
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%" // Ajuste a altura conforme necessário
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                  />
                ) : info ? (
                  <div className="flex flex-col h-full justify-between gap-2">
                    <div className="flex justify-between border rounded-md border-gray-500">
                      <div className="w-1/3 border-r p-2 border-gray-500">
                        <p className="lg:text-base text-dark dark:text-neutral-300 inter">
                          Total Hours
                        </p>
                      </div>

                      <div className="w-2/3 hover:bg-gray-400 dark:hover:bg-custom-campos rounded-r-md duration-150 flex-1 p-2">
                        <div className="flex justify-between">
                          <span className="lg:text-base text-dark dark:text-neutral-300 inter ">
                            {hoursPlayed.totalHours} hours
                          </span>
                          <Tooltip
                            title={
                              <span>
                                Paid games:{" "}
                                <span className="text-purple-400">
                                  {hoursPlayed.paiedHoursPlayed}
                                </span>{" "}
                                hours
                                <br />
                                Free games:{" "}
                                <span className="text-purple-400">
                                  {hoursPlayed.freeHoursPlayed}
                                </span>{" "}
                                hours
                              </span>
                            }
                            placement="right"
                          >
                            <AccessTimeIcon className="text-dark dark:text-neutral-300" />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default React.memo(ShowInfo);
