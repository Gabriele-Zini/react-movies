import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import SeriesCard from "./components/SeriesCard";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 3,
    infinite: false,
    arrows: true,
    accessibility: true, 
    focusOnSelect: true,
    wheel: true,
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
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
          `https://api.themoviedb.org/3/discover/movie?&sort_by=vote_average.desc&vote_count.gte=200`,
          { params }
        );

        const resp= await axios.get(`https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=vote_average.desc&vote_count.gte=200`, {params})

        const moviesData = res.data.results;
        const seriesData =resp.data.results;
       

        // MOVIES CREDITS
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

        // SERIES CREDITS
        const seriesWithCredits = await Promise.all(
          seriesData.map(async (serie) => {
            const creditsParams = {
              api_key: "7c99d77d8acb8db9c5ee5504f2096b13",
            };
            const creditsRes = await axios.get(
              `https://api.themoviedb.org/3/tv/${serie.id}/credits`,
              { params: creditsParams }
            );
            const credits = creditsRes.data.cast;

            return {
              ...serie,
              credits: credits,
            };
          })
        );
        setSeries(seriesWithCredits)
        setMovies(moviesWithCredits);
        console.log(seriesWithCredits)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="my-5 ms_container">
        <h3 className="text-center text-white mb-4 ms_margin-top">Movies</h3>
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div className="ms_padding-start ps-xl-3 " key={index}>
              <Card movie={movie} />
            </div>
          ))}
        </Slider>
        <h3 className="text-center text-white mt-5 mb-4">Series</h3>
        <Slider {...settings}>
          {series.map((serie, index) => (
            <div className="ms_padding-start ps-xl-3" key={index}>
              <SeriesCard serie={serie} />
            </div>
          ))}
        </Slider>
        <FontAwesomeIcon
          href="#"
          icon={faChevronUp}
          className="ms_chevron-up"
          onClick={scrollToTop}
        />
        <FontAwesomeIcon
          href="#"
          icon={faChevronDown}
          className="ms_chevron-down"
          onClick={scrollToBottom}
        />
      </div>
    </>
  );
}

export default App;
