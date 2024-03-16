import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Card from "./components/Card";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length - size + 1; i ++) {
      chunkedArr.unshift(arr.slice(i, i + size));
    }
    console.log(chunkedArr)
    return chunkedArr;
  };

  const movieChunks = chunkArray(movies, 7);

  return (
    <>
      <div className=" mb-5">
        <h3 className="text-center text-white mb-4">Movies</h3>
        <Carousel
          indicators={false}
          controls={true}
          interval={null}
          pause={false}
          slide={true}
          fade={true}
          pauseOnHover={false}
          keyboard={false}
          touch={true}
          prevIcon={
            <span className="arrow-button">
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
          }
          nextIcon={
            <span className="arrow-button">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          }
          className="netflix-carousel"
        >
          {movieChunks.map((movieChunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center flex-row gap-3">
                {movieChunk.map((movie, index) => (
                  <div key={index} className="flex-grow-0">
                    <Card movie={movie} />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default App;
