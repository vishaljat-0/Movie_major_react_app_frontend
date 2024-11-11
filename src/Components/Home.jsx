import React, { useEffect, useState } from "react";
import Sidemap from "./templates/Sidemap";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";
import axios from "../utils/axios";
import Horizontalcard from "./templates/Horizontalcard";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

//  SECONDARY #6556CD
//  PRIMARY #1F1E24

function Home() {
  const [wallpepar, setwallpepar] = useState(null);
  const [Trending, setTrending] = useState(null);
  const [Category, setCategory] = useState(['tv']);

  const getheaderwallpepar = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomedata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpepar(randomedata);
    } catch (error) {
      console.log(error);
    }
  };

  const gettrendiing = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);

      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettrendiing();
    !wallpepar && getheaderwallpepar();
  }, [Category]);

  useEffect(() => {
    document.title = "SCSDB – Discover What's Trending";
  }, []);

  return wallpepar && Trending ? (
    <>
      <Sidemap />
      <div className="w-full h-full overflow-auto overflow-x-hidden bg-[#1F1E24]">
        <Topnav />
        <Header headerdata={wallpepar} />

        <div className="px-3 sm:px-5 mt-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Trending
          </h1>
          <div className="hidden sm:block">
            <Dropdown
              title="Filter"
              option={["TV", "MOVIE"]}
              fun={(e) => setCategory(e.target.value.toLowerCase())}
            />
          </div>
        </div>

        <Horizontalcard
          className="w-full sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-full"
          treandingdata={Trending}
        />
      </div>
    </>
  ) : (
    <h1 className="text-white"> <Loading/> </h1>
  );
}

export default Home;