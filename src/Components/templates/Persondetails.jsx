  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { asyncloadperson } from "../Store/actions/Personaction";
  // import { removeperson } from "../Store/actions/Personaction"; // Adjusted for consistency
  import { removeperson } from "../Store/reducers/Personslice";
  import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
  import { FaArrowLeft } from "react-icons/fa";
  import { FaEarthAsia } from "react-icons/fa6";
  import { FaExternalLinkSquareAlt } from "react-icons/fa";
  import { SiImdb } from "react-icons/si";
  import Loading from "../Loading";
  import { Link } from "react-router-dom";

  
  const PersonDetails = () => {
    const info = useSelector((state) => state.person.info);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showFullBio, setShowFullBio] = useState(false);
  
    useEffect(() => {
      if (id) {
        dispatch(asyncloadperson(id));
      }
      return () => {
        dispatch(removeperson());
      };
    }, [id, dispatch]);
  
    if (!info || !info.detail) {
      return <Loading />;
    }
  
    const truncatedBio = info.detail.biography
      ? `${info.detail.biography.substring(0, 200)}...`
      : "Biography not available";
  
    return (
      <div className="bg-gray-900 overflow-x-hidden w-full h-full flex flex-col items-center py-10 px-6">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full px-6 md:px-20 py-4 flex items-center justify-between bg-gray-800 bg-opacity-90 z-50">
          <button
            onClick={() => navigate(-1)}
            className="text-white text-lg bg-purple-600 p-3 rounded-full hover:bg-purple-500 transition duration-200"
            aria-label="Go Back"
          >
            <FaArrowLeft />
          </button>
          <div className="flex space-x-4 text-white text-xl">
            {info.detail?.homepage && (
              <a href={info.detail.homepage} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkSquareAlt className="hover:text-purple-400" />
              </a>
            )}
            {info.externalid?.wikidata && (
              <a href={`https://www.wikidata.org/wiki/${info.externalid.wikidata}`} target="_blank" rel="noopener noreferrer">
                <FaEarthAsia className="hover:text-purple-400" />
              </a>
            )}
            {info.detail?.imdb_id && (
              <a href={`https://www.imdb.com/name/${info.detail.imdb_id}`} target="_blank" rel="noopener noreferrer">
                <SiImdb className="hover:text-yellow-400" />
              </a>
            )}
          </div>
        </nav>
  
        {/* Main Content */}
        <div className="container mt-20 flex flex-col md:flex-row items-center gap-10">
          {info.detail?.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
              alt={info.detail.name}
              className="w-64 h-80 object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            />
          )}
  
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-semibold mb-4">{info.detail.name}</h1>
            <p className="text-sm text-gray-400 mb-2 italic">
              {info.detail.also_known_as?.join(", ") || "No alternate names"}
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              {showFullBio ? info.detail.biography : truncatedBio}
              {info.detail.biography && info.detail.biography.length > 200 && (
                <a
                  href={`https://www.imdb.com/name/${info.detail.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 cursor-pointer ml-2"
                >
                  Read Full Biography
                </a>
              )}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="bg-purple-700 rounded-lg py-2 px-4">
                <p className="text-sm font-semibold">Birthday</p>
                <p className="text-md">{info.detail.birthday || "N/A"}</p>
              </div>
              <div className="bg-purple-700 rounded-lg py-2 px-4">
                <p className="text-sm font-semibold">Place of Birth</p>
                <p className="text-md">{info.detail.place_of_birth || "N/A"}</p>
              </div>
              <div className="bg-purple-700 rounded-lg py-2 px-4">
                <p className="text-sm font-semibold">Gender</p>
                <p className="text-md">{info.detail.gender === 2 ? "Male" : "Female"}</p>
              </div>
              <div className="bg-purple-700 rounded-lg py-2 px-4">
                <p className="text-sm font-semibold">Popularity</p>
                <p className="text-md">{info.detail.popularity.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
  
        {info.movieCredits?.cast?.length > 0 && (
          <div className="w-full mt-10 bg-gray-900">
            <h2 className="text-3xl font-semibold text-white text-center mb-4">Movie Credits</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-20">
              {info.movieCredits.cast.slice(0, 8).map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PersonDetails;