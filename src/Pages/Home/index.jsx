import "./Style.css";
import Navbar from "../../Components/Navbar/navbar";
import { useState, useEffect } from "react";
import Search from "../../Components/Search/Search";
import ShowInfo from "../../Components/ShowInfo/ShowInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import modeLight from "../../assets/day.png";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import ErrorPageSearch from "../../Components/ErrorPageSearch/ErrorPageSearch";
import Carousel from "../../Components/Carousel/Carousel";

const Home = () => {
  const [theme, setTheme] = useState("dark");
  const [componente, setComponente] = useState("old");
  const [id, setId] = useState("");

  const saveid = (newId) => {
    setId(newId);
    console.log("ID recebido:", newId);
  };

  const trocarComponente = (estado) => {
    setComponente(estado);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      console.log("Current theme:", theme);
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Current theme:", theme);
    }
  }, [theme]);

  return (
    <div className="h-full w-full">
      <div className="absolute h-4/6 w-2/4 rounded-full blur-3xl opacity-10 -top-80 -left-96 bg-purple-700">
        <p className="">a</p>
      </div>
      <div className="flex justify-center">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>

      {componente === "old" && (
        <div className="flex justify-center mt-12 h-2/3">
          <Search
            trocarComponente={trocarComponente}
            Componente={componente}
            theme={theme}
            saveid={saveid}
          />
        </div>
      )}

      {componente === "new" && (
        <div className="w-full">
          <div className="flex flex-col items-center mt-12 h-auto">
            <ShowInfo id={id} trocarComponente={trocarComponente} Componente={componente} theme={theme} />

            <Carousel></Carousel>    

          </div>
        </div>
      )}

      {componente === "error" && (
        <div className="w-full flex justify-center">
          <div className="flex flex-col items-center border-2 rounded-md border-gray-500 w-2/3 items-center justify-center mt-12 h-auto">
            <ErrorPage></ErrorPage>

            <ErrorPageSearch theme={theme} saveid={saveid} Componente={componente} trocarComponente={trocarComponente}></ErrorPageSearch>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
