import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Loading from "../Loading";
import Dropdown from "./Dropdown";
import Cards from "./Cards"; // Ensure this handles people data
import { FaArrowLeft } from "react-icons/fa";

const People = () => {
  const [Category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  document.title = "SCSDB – People";

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${Category}?page=${page}`);

      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      getPeople();
    } else {
      setPage(1); // Reset to the first page on refresh
      setPeople([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return people.length > 0 ? (
    <div className="h-screen w-screen bg-[#1F1E24]">
      <div className="mt-5 px-10 w-full bg-[#1F1E24] flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-white bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl"
        >
          <FaArrowLeft className="text-sm" />
        </i>
        <h1 className="text-2xl font-semibold text-zinc-400">People</h1>
        <Topnav />
        <Dropdown
          title="Category"
          option={["popular", "latest"]}
          fun={(e) => setCategory(e.target.value)}
          value={Category}
        />
        <div className="w-[4%]"></div>
      </div>
      <InfiniteScroll
        hasMore={hasMore}
        next={getPeople}
        dataLength={people.length}
        loader={<h1 className="bg-[#1F1E24] w-screen">Loading...</h1>}
      >
        <Cards data={people} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
