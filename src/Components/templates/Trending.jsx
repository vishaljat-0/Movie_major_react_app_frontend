import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Cards from "./Cards";
import Loading from "../Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [Category, setCategory] = useState("all");
  const [Duration, setDuration] = useState("day");
  const [Trending, setTrending] = useState([]);
  const [page, setpage] = useState(1);
  const [Hasmoree, setHasmoree] = useState(true);
  const navigate = useNavigate();
  document.title = "SCSDB – Trending Now";

  const gettrendiing = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${Category}/${Duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1);
      } else {
        setHasmoree(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Refreshandler = () => {
    if (Trending.length === 0) {
      gettrendiing();
    } else {
      setpage(1);
      setTrending([]);
      gettrendiing();
    }
  };

  useEffect(() => {
    Refreshandler();
  }, [Category, Duration]);

  return Trending.length > 0 ? (
    <div className="  h-full  px-15  w-[100%] bg-[#1F1E24] ">
      <div className="mt-5  p-5 bg-[#1F1E24]  flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-white bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl"
        >
          <FaArrowLeft className="text-sm" />
        </i>
        <h1 className="text-2xl font-semibold text-zinc-400">Trending</h1>
        <Topnav />
        <Dropdown
          title="Category"
          option={["Movie", "Tv", "All"]}
          fun={(e) => setCategory(e.target.value)}
          value={Category}
        />
        <div className="w-[4%] "></div>
        <Dropdown
          title="Duration"
          option={["Week", "Day"]}
          value={Duration}
          fun={(e) => setDuration(e.target.value)}
        />
      </div>
      <InfiniteScroll
      className="overflow-x-hidden bg"
        hasMore={Hasmoree}
        next={gettrendiing}
        dataLength={Trending.length}
        loader={
          <div className="justify-center flex py-5 bg-[#1F1E24]">
            <h1 className="text-center text-white bg-black p-2 rounded-lg">
              Loading...
            </h1>
          </div>
        }
      >
        <Cards data={Trending} title={Category}  />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
