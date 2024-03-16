import SvgComponent from "../components/Logo";
import video from "../assets/video/6012602_Vfx Hologram Immersive Virtual Reality_By_Frame_Stock_Footage_Artlist_HD.mp4";
import LogoMobile from "./LogoMobile";
import { Link } from "react-router-dom"; // Importa solo Link se stai usando solo il componente Link
import { useState } from "react";

function Header() {
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
            <ul
              className={`list-unstyled fw-bold ms_navlink d-flex gap-2 ${
                isOpen ? "show" : ""
              }`}
            >
              {/* Utilizza Link per navigare */}
              <li>
                <Link className="ms_link" to="/">Home</Link>
              </li>
              <li>
                <Link  className="ms_link" to="/movies">Movies</Link>
              </li>
              <li>
                <Link  className="ms_link" to="/tv-series">TV series</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
