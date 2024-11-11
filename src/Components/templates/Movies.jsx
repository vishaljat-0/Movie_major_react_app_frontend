import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Loading from "../Loading";
import Dropdown from "./Dropdown";
// import Cards from "./
 import Cards from "./Cards";
import { FaArrowLeft } from "react-icons/fa";
const Movies = () => {
    const [Category, setCategory] = useState("now_playing");
    const [Duration, setDuration] = useState("day");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [Hasmoree, setHasmoree] = useState(true);
    const navigate = useNavigate();
    document.title = "SCSDB – Trending Movies";
    const getMovie = async () => {
        try {
          const { data } = await axios.get(
            `/movie/${Category}?page=${page}`
          );
    
          // setmovie(data.results);
          if (data.results.length > 0) {
            setmovie((prevstate) => [...prevstate, ...data.results]);
            setpage(page + 1);
          } else {
            setHasmoree(false);
          }
          // console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      const Refreshandler = () => {
        if (movie.length === 0) {
          getMovie();
        } else {
          setpage(page + 1);
          setmovie([]);
          getMovie();
        }
      };
      // console.log(movie);
      useEffect(() => {
        Refreshandler();
      }, [Category]);
  return movie.length > 0 ? (
    <div className="    h-screen w-screen   bg-[#1F1E24] ">
      <div className="   mt-5 px-10 w-full bg-[#1F1E24]  flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-white bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl"
        >
          <FaArrowLeft className="text-sm" />
        </i>
        <h1 className="text-2xl font-semibold text-zinc-400"> movie</h1>
        <Topnav/>
        <Dropdown
          title="Category"
          option={["popular", "top_rated", "upcoming", "now_playing", ]}
          fun={(e) => setCategory(e.target.value)}
          value={Category}
        />
        <div className="w-[4%]"></div>
      
      </div>
      <InfiniteScroll
        hasMore={Hasmoree}
        next={getMovie} // Pass the function reference, not the call
        dataLength={movie.length}
        loader={<h1 className="bg-[#1F1E24]  w-screen">Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default Movies;
