import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../utils/Noimage.jpg"; // Import noimage

const Cards = ({ data, title }) => {

  return (
    <div className="p-10  sm:p-0  md:p-10 lg:p-10   overflow-x-hidden  w-[100%] bg-[#1F1E24]">
      {title && (
        <h2 className="text-2xl ml-0 sm:ml-0 md:ml-6 lg:ml-6 xl:ml-6 font-bold text-white mb-4">
          {title.toUpperCase()}
        </h2>
      )}

      {/* Flexbox container */}
      <div className=" bg-[#1F1E24]  flex flex-wrap gap-4 justify-start  " >
        {data.map((v, i) => (
          <Link
            to={`/${v.media_type || title}/details/${v.id || ''}`}
            key={i}
            className="bg-[#2A2A2A] ml-0 sm:ml-6 lg:ml-6 md:ml-6 xl:ml-6 rounded-lg w-full sm:w-[48%] md:w-[30%] lg:w-[22%] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <img
              src={
                v.poster_path || v.backdrop_path || v.profile_path
                  ? `https://image.tmdb.org/t/p/original/${v.poster_path || v.backdrop_path || v.profile_path}`
                  : noimage
              }
              alt={v.title || v.name || "Media Image"}
              className="w-full h-72 object-cover"
              style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)" }}
              onError={(e) => e.target.src = noimage} // Fallback for broken images
            />

            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-2 truncate">
                {v.title || v.original_name || v.name || v.original_title || "Untitled"}
              </h3>

              {v.vote_average && (
                <div className="flex items-center justify-between mt-auto">
                  <span className="bg-[#FFDD57] text-black font-semibold px-2 py-1 rounded-full text-sm">
                    {Math.floor(v.vote_average)} Rating
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
