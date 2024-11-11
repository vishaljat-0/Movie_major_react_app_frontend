import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import Noimage from "../../utils/Noimage.jpg";

function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  
  const Getsearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Getsearch();
  }, [query]);

  return (
    <div className="w-[100%]   h-[10vh] flex items-center  bg-[#1F1E24] p-4 relative">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-800 rounded-full w-full md:w-3/4 lg:w-1/2 mx-auto px-4 py-2 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
        <FaSearch className="text-gray-400 text-xl cursor-pointer transition duration-300 hover:text-gray-200" />
        
        {/* Hide input text on small screens, show on md and larger */}
        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search for movies, shows, and more..."
          className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-base ml-4 flex-grow hidden md:block  lg:block xl:block 2xl:block" 
        />
        
        {/* Close button */}
        {query.length > 0 && (
          <IoCloseSharp
            className="text-gray-400 text-2xl cursor-pointer transition duration-300 hover:text-red-500"
            onClick={() => setquery("")}
          />
        )}
      </div>

      {/* Dropdown search results */}
      {query && (
        <div className="absolute z-10 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-h-[50vh] bg-[#282828] top-[110%] left-1/2 transform -translate-x-1/2 rounded-lg shadow-2xl overflow-auto">
          {searches.map((s, i) => (
            <Link
              key={i}
              to={`/${s.media_type}/details/${s.id}`}
              className="w-full flex items-center p-4 bg-gradient-to-r from-[#3a3a3a] to-[#484848] hover:bg-[#555] transition-transform duration-200 border-b border-gray-600"
            >
              <img
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                    : Noimage
                }
                alt="Search Result"
                className="w-12 h-12 rounded-full object-cover mr-4 shadow-lg"
              />
              <span className="text-white font-semibold text-lg">
                {s.name || s.title || s.original_title || s.original_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
