
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Loading from "../Loading";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import { FaArrowLeft } from "react-icons/fa";



const Tvshows = () => {
    const [Category, setCategory] = useState("airing_today");
    const [Duration, setDuration] = useState("day");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [Hasmoree, setHasmoree] = useState(true);
    const navigate = useNavigate();
    document.title = "SCSDB –  Tv ";
    const gettv = async () => {
        try {
          const { data } = await axios.get(
            `/tv/${Category}?page=${page}`
          );
    
          // settv(data.results);
          if (data.results.length > 0) {
            settv((prevstate) => [...prevstate, ...data.results]);
            setpage(page + 1);
          } else {
            setHasmoree(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const Refreshandler = () => {
        if (tv.length === 0) {
          gettv();
        } else {
          setpage(page + 1);
          settv([]);
          gettv();
        }
      };
      useEffect(() => {
        Refreshandler();
      }, [Category]);
  return  tv.length > 0 ? (
    <div className="    h-screen w-screen  bg-[#1F1E24] ">
      <div className="   mt-5 px-10 w-full bg-[#1F1E24]  flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-white bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl"
        >
          <FaArrowLeft className="text-sm" />
        </i>
        <h1 className="text-2xl font-semibold text-zinc-400"> TV </h1>
        <Topnav/>
        <Dropdown
          title="Category"
          option={[ "popular", "on_the_air", "airing_today", ]}
          fun={(e) => setCategory(e.target.value)}
          value={Category}
        />
        <div className="w-[4%]"></div>
      
      </div>
      <InfiniteScroll
        hasMore={Hasmoree}
        next={gettv} // Pass the function reference, not the call
        dataLength={tv.length}
        loader={<h1 className="bg-[#1F1E24]  w-screen">Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default Tvshows;
