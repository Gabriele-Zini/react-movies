import SvgComponent from "../components/Logo";
import video from "../assets/video/6012602_Vfx Hologram Immersive Virtual Reality_By_Frame_Stock_Footage_Artlist_HD.mp4";
import LogoMobile from "./LogoMobile";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <video
          autoPlay
          loop
          muted
          src={video}
          className="ms_video w-100 ms_404-video"
        ></video>
        <div>
          <SvgComponent />
          <LogoMobile />
        </div>
        <div>
          <nav>
            <button className="navbar-toggler" onClick={toggleNavbar}>
              <span className="navbar-toggler-icon">&#9776;</span>
            </button>
            <ul
              className={`list-unstyled fw-bold ms_navlink d-flex gap-2 ${
                isOpen ? "show" : ""
              }`}
            >
              <li>Movies</li>
              <li>TV series</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default App;
