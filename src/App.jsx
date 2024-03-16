import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import "./App.css";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"; */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const settings = {
    slidesToShow: 6,
    infinite: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {
          api_key: "7c99d77d8acb8db9c5ee5504f2096b13",
          page: page,
        };
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?`,
          { params }
        );

        const moviesData = res.data.results;

        const moviesWithCredits = await Promise.all(
          moviesData.map(async (movie) => {
            const creditsParams = {
              api_key: "7c99d77d8acb8db9c5ee5504f2096b13",
            };
            const creditsRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
              { params: creditsParams }
            );
            const credits = creditsRes.data.cast;

            return {
              ...movie,
              credits: credits,
            };
          })
        );

        setMovies(moviesWithCredits);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <div className="my-5 ms_container">
        <h3 className="text-center text-white mb-4">Movies</h3>
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div key={index}>
              <Card movie={movie} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default App;
