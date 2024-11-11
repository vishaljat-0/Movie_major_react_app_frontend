import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { asyncloadtv, removetv } from "../Store/actions/TVaction";
import { asyncloadtv}  from "../Store/actions/TVaction"
import { removetv } from "../Store/reducers/Tvslice";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { SiImdb } from "react-icons/si";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import HorizontalCard from "./Horizontalcard";
import { FaPlay } from "react-icons/fa";


const TvDetails = () => {
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const backgroundImage = info?.detail?.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`
    : "none";

  useEffect(() => {
    if (id) {
      dispatch(asyncloadtv(id));
    }
    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  return info ? (
    <div
      style={{
        backgroundColor: "#1F1E24",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full min-h-[100vh] flex flex-col items-center justify-center px-4 py-5 overflow-auto"
    >
      {/* Navigation Bar */}
      <nav className="fixed top-0 px-6 md:px-20 left-0 right-0 bg-opacity-80 py-3 text-white flex justify-between items-center z-50">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          className="bg-[#6556CD] p-2 rounded-full hover:bg-[#5248b2] transition-transform duration-300 transform hover:scale-105"
        >
          <FaArrowLeft className="text-lg" />
        </button>
        <div className="flex items-center space-x-3">
          {info.detail?.homepage && (
            <a
              href={info.detail.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5248b2] transition duration-200"
            >
              <FaExternalLinkSquareAlt className="text-xl" />
            </a>
          )}
          {info.external_ids?.wikidata && (
            <a
              href={`https://www.wikidata.org/wiki/${info.external_ids.wikidata}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5248b2] transition duration-200"
            >
              <FaEarthAsia className="text-xl" />
            </a>
          )}
          {info.detail?.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${info.detail.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5248b2] transition duration-200"
            >
              <SiImdb className="text-xl" />
            </a>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full h-[65vh] px-4 md:px-10 mt-[12%] gap-6 justify-center flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Image Section */}
        {info.detail && (
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
              alt={info.detail.title || "tv Poster"}
              className="h-[50vh] w-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
              style={{ boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.7)" }}
            />
          </div>
        )}

        {/* tv Details */}
        <div className="bg-white h-[50vh] bg-opacity-90 rounded-lg shadow-lg p-6 max-w-xl text-center flex flex-col justify-between space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{info.detail?.name || "tv Title"}</h1>
          <p className="text-sm md:text-md italic text-gray-600">Language: {info.detail?.original_language || "English"}</p>
          <p className="text-gray-800 text-sm md:text-base">{info.detail?.overview || "tv overview goes here."}</p>
          <div className="flex justify-center space-x-3 mt-3">
            <span className="bg-[#6556CD] text-white px-3 py-1 rounded-full text-xs md:text-sm">
              Release Date: {info.detail?.first_air_date}
            </span>
            <span className="bg-[#6556CD] text-white px-3 py-1 rounded-full text-xs md:text-sm">
              Rating: {info.detail?.vote_average}
            </span>
          </div>

          {/* Trailer Section */}
            <div className="mt-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Watch the Trailer</h2>
              <Link
                to={`${pathname}/trailer`}
                className="relative block w-full h-0 pb-[5.25%] overflow-hidden rounded-lg shadow-lg bg-gray-300 hover:opacity-80 transition-opacity duration-300"
                title="Watch Trailer"
              >
                <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-lg font-semibold bg-red-600 bg-opacity-90 rounded-lg shadow-lg">
                  PLAY TRAILER
                  <FaPlay className="ml-4 text-2xl" />
                </span>
              </Link>
            </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {info.recommendation?.length > 0 || info.similar?.length > 0 ? (
        <div className="w-full h-fit px-4 mt-10">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Recommendations</h2>
          <HorizontalCard
            additionalStyles="bg-red-500 p-4 rounded-lg shadow-md"
            treandingdata={info.recommendation?.length > 0 ? info.recommendation : info.similar || []}
          />
        </div>
      ) : null}
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
