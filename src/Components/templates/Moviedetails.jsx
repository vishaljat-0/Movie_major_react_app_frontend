 import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { asyncloadmovie, removemovie } from "../Store/actions/Movieaction";
 import { asyncloadmovie } from "../Store/actions/MOvieaction";
 import { removemovie } from "../Store/actions/MOvieaction";

import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { SiImdb } from "react-icons/si";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import HorizontalCard from "./Horizontalcard";
import { FaPlay } from "react-icons/fa";

// import { Trailer } from "./Trailer";

const MovieDetails = () => {
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const backgroundImage = info?.detail?.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`
    : "none";

  useEffect(() => {
    if (id) {
      dispatch(asyncloadmovie(id));
    }
    return () => {
      dispatch(removemovie());
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
      className="w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-5 overflow-auto"
    >
      {/* Navigation Bar */}
      <nav className="fixed top-0 px-4 md:px-20 left-0 right-0 bg-opacity-80 py-3 text-white flex justify-between items-center z-50">
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
      <div className="w-full h-auto px-4  -10  mt-[50%] flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Image Section */}
        {info.detail && (
          <div className="w-full  md:w-1/3   lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
              alt={info.detail.title || "Movie Poster"}
              className="h-auto w-full hidden lg:block md:block xl:block object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
              style={{ boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.7)" }}
            />
          </div>
        )}

        {/* Movie Details */}
        <div className="bg-white h-auto bg-opacity-90 rounded-lg shadow-lg p-6 max-w-3xl text-center flex flex-col justify-between space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{info.detail?.title || "Movie Title"}</h1>
          <p className="text-md italic text-gray-600">{info.detail?.tagline || "Movie Tagline"}</p>
          <p className="text-gray-800 text-sm md:text-base">{info.detail?.overview || "Movie overview goes here."}</p>
          <div className="flex justify-center space-x-3 mt-3">
            <span className="bg-[#6556CD] text-white px-3 py-1 rounded-full">
              Release Date: {info.detail?.release_date}
            </span>
            <span className="bg-[#6556CD] text-white px-3 py-1 rounded-full">
              Rating: {info.detail?.vote_average}
            </span>
          </div>

          {/* Trailer Section */}
          <div className="mt-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Watch the Trailer</h2>
            <Link
              to={`${pathname}/trailer`}
              className="relative block w-full pb-[5.25%] overflow-hidden rounded-lg shadow-lg bg-gray-300 hover:opacity-80 transition-opacity duration-300"
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
          <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-4">Recommendations</h2>
          <HorizontalCard
            additionalStyles="bg-red-500 p-4 rounded-lg shadow-md"
            treandingdata={info.recommendation?.length > 0 ? info.recommendation : info.similar || []}
          />
        </div>
      ) : null}
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
