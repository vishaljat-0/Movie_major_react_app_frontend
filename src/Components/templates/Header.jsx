import React from "react";
import { Link } from "react-router-dom";

function Header({ headerdata }) {
  const backgroundImage = `url(https://image.tmdb.org/t/p/original/${
    headerdata.backdrop_path || headerdata.profile_path
  })`;

  return (
    <div
      style={{
        backgroundImage: `${backgroundImage}, linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-[35vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col    justify-center text-white p-4 md:p-8 lg:p-12  lg:text-left xl:text-left left-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          {headerdata.title ||
            headerdata.original_name ||
            headerdata.name ||
            headerdata.original_title}
        </h1>

        <p className="text-xs  hidden  lg:blockn  xl:block sm:text-sm md:text-base font-semibold text-yellow-300 tracking-wide mb-2">
          Release Date:{" "}
          {headerdata.release_date
            ? new Date(headerdata.release_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "No Information"}
        </p>

        <p className="text-xs sm:text-sm md:text-base font-semibold   hidden  lg:blockn  xl:block text-zinc-300 tracking-wide mb-4">
          Media Type: {headerdata.media_type?.toUpperCase()}
        </p>

        <Link
          to={`/${headerdata.media_type}/details/${headerdata.id}`}
          className="mt-4 w-fit  sm:w-fit  md:w-fit lg:w-fit  px-6  sm:left-0  sm:px-8 py-2 bg-blue-500 md:bg-blue-600 sm:bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base whitespace-nowrap  "
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  );
}

export default Header;
