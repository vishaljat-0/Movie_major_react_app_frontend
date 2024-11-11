import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from "../../utils/Noimage.jpg";

function HorizontalCard({ treandingdata ,additionalStyles }) {
  if (!treandingdata || treandingdata.length === 0) {
    return <p className="text-white">No trending data available.</p>;
  }

  return (
    <div className="w-full h-[40vh] p-5 bg-[#1F1E24] rounded-lg shadow-lg">
      {/* Header Section */}

      {/* Horizontal Scroll Section */}
      <div className="w-full flex overflow-x-auto space-x-4">
        {(treandingdata || []).map((c, i) => (
          <Link
            to={`/${c.media_type}/details/${c.id}`}
            key={i}
            className="bg-gray-800 min-w-[250px] mb-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            {/* Image Section */}
            <img
              src={ c.backdrop_path || c.profile_path || c.poster_path ? `https://image.tmdb.org/t/p/original/${c.backdrop_path || c.profile_path || c.poster_path}` : noimage}   
              alt="Media Image"
              className="w-full h-40 object-cover rounded-t-lg"
            />

            {/* Content Section */}
            <div className="p-4">
              <h1 className="text-lg font-semibold text-white mb-2">{c.title || c.name || c.original_name}</h1>
              <p className="text-sm font-normal text-gray-300 mb-3">
                {c.overview ? `${c.overview.slice(0, 100)}...` : "No overview available."}
              </p>
              <p className="text-xs font-semibold text-gray-400">
                Media Type: {c.media_type?.toUpperCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizontalCard;
