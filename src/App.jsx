import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import Trending from "./Components/templates/Trending";
import Popular from "./Components/templates/Popular";
import Movies from "./Components/templates/Movies";
import Tvshows from "./Components/templates/Tvshows";
import People from "./Components/templates/People";
import About from "./Components/templates/About";
import ContactUs from "./Components/templates/Contatctus";
// import Moviedetails from "./Components/templates/moviedetails";
import Moviedetails from './Components/templates/Moviedetails'
import Tvdeatils from "./Components/templates/Tvdeatils";
// import Peopledetails from "./Components/templates/peopledetails";
import Persondetails from "./Components/templates/Persondetails";
import { Trailer } from "./Components/templates/Trailer";
import Notfound from "./Components/Notfound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-[#1F1E24] h-screen w-screen flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movies/>} />
          <Route path="/movie/details/:id" element={<Moviedetails />} />
          <Route   path="/movie/details/:id/trailer" element={<Trailer/>}  />
          <Route   path="/tv/details/:id/trailer" element={<Trailer/>}  />

          {/* <Route path="/movie/details/:id" element={<Moviedetails/>} /> */}
          <Route path="/tvshow" element={<Tvshows/>} />
          <Route path="/tv/details/:id" element={<Tvdeatils />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/details/:id" element={<Persondetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="*" element={<Notfound />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
