import React from "react";
import { Link } from "react-router-dom";
import {
  FaFire,
  FaStar,
  FaFilm,
  FaTv,
  FaUsers,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

function Sidemap() {
  return (
    <div className=" min-h-screen w-[30%] sm:w-[20%] md:w-[25%]  overflow-hideen  lg:w-[20%] p-4 sm:p-5 md:p-6 lg:p-8 border-r-2 border-zinc-400 bg-gray-800">
      <h1 className="text-lg sm:text-xl md:text-2xl text-white font-bold flex items-center">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>SCSDB</span>
      </h1>

      <nav className="text-zinc-400 px-1    flex flex-col gap-2 mb-4">
        <h1 className="text-white font-semibold text-md sm:text-lg md:text-xl mt-6 sm:mt-8 mb-4">
          New Feeds
        </h1>

        <Link
          to="/Trending"
          className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg transition duration-300"
        >
          <FaFire className="text-md sm:text-lg md:text-xl hidden sm:block" />
          <span className="text-sm sm:text-base">Trending</span>
        </Link>

        <Link
          to="/popular"
          className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg transition duration-300"
        >
          <FaStar className="text-md sm:text-lg md:text-xl hidden sm:block" />
          <span className="text-sm sm:text-base">Popular</span>
        </Link>

        <Link
          to="/movie"
          className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg transition duration-300"
        >
          <FaFilm className="text-md sm:text-lg md:text-xl hidden sm:block" />
          <span className="text-sm sm:text-base">Movies</span>
        </Link>

        <Link
          to="/Tvshow"
          className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg transition duration-300"
        >
          <FaTv className="text-md sm:text-lg md:text-xl hidden sm:block" />
          <span className="text-sm sm:text-base">TV Shows</span>
        </Link>

        <Link
          to="/People"
          className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg transition duration-300"
        >
          <FaUsers className="text-md sm:text-lg md:text-xl hidden sm:block" />
          <span className="text-sm sm:text-base">People</span>
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 hidden m lg:block xl:block" />

      <nav className="text-zinc-400 flex  flex-col gap-0 ">
        <h1 className="text-white font-semibold text-md sm:text-lg md:text-xl mt-6 sm:mt-0  lg:mt-6 xl:mt-6 lg:mb-5 mb-2 ">
          Website Information
        </h1>

        <Link
          to="/About"
          className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white p-0 sm:p-0 md:p-0  lg:p-3 rounded-lg transition duration-300"
        >
          <FaInfoCircle className="text-md sm:text-lg  md:text-xl hidden sm:block" />
          <span className="text-sm sm:text-base">About</span>
        </Link>

        <Link
          to="/Contactus"
          className="flex items-center  gap-2 hover:bg-[#6556CD] hover:text-white p-2 md:p-3 rounded-lg transition duration-300 "
        >
          <FaEnvelope className="text-md sm:text-lg  md:text-xl  hidden lg:block xl:block" />
          <span className="text-sm sm:text-base hidden lg:block xl:block">Contact Us</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidemap;
