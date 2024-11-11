import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import Loading from '../Loading';
import { FaArrowLeft } from "react-icons/fa";
import Notfound from "../Notfound";


export const Trailer = () => {
  const { pathname } = useLocation();
  const navigate= useNavigate()
  const category = pathname.includes("movie") ? "movie" : "tv";

  // Access the video data from Redux state
  const ytvideos = useSelector(state => state[category]?.info?.videos);
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ytvideos && ytvideos.key) {
      setVideoKey(ytvideos.key);  // Set the video key from the Redux state
      setLoading(false);  // Set loading to false once the video is available
    }
  }, [ytvideos]);

  // Fallback in case there is no video key
  const videoUrl = videoKey ? `https://www.youtube.com/watch?v=${videoKey}` : null;

  if (loading) {
    return <Notfound />;
  }

  return (
    <div className=" relative w-full flex justify-center items-center bg-zinc-500 py-6">
     <i
          onClick={() => navigate(-1)}
          className="text-white  absolute top-5 left-[10%]   bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl"
        >
          <FaArrowLeft className="text-sm" />
        </i>
      {videoUrl ? (
        <div className="w-full max-w-4xl h-[60vh] md:h-[70vh] lg:h-[80vh] bg-black rounded-lg shadow-lg overflow-hidden">
       
          {/* ReactPlayer Component with Tailwind styling */}
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
            className="react-player"
            light={true}  // Displays a light thumbnail initially
            playing={true}  // Prevents auto-playing
          />
        </div>
      ) : (
       <Notfound/>
      )}
    </div>
  );
};

export default Trailer;

