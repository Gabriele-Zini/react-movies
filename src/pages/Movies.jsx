import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const endOfListRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [loadingMore, setLoadingMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let apiUrl;
      if (inputValue !== "") {
        apiUrl = "https://api.themoviedb.org/3/search/movie?";
      } else {
        apiUrl = "https://api.themoviedb.org/3/discover/movie";
      }
      const params = {
        api_key: "7c99d77d8acb8db9c5ee5504f2096b13",
        page: page,
        query: inputValue,
      };
      const res = await axios.get(apiUrl, {
        params,
      });

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

      if (page === 1) {
        setMovies(moviesWithCredits);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...moviesWithCredits]);
      }

      setLoading(false);
      setLoadingMore(false);
      /*  console.log(inputValue);*/
      console.log(moviesWithCredits);
      console.log("Loading more:", loadingMore);
    };

    fetchData();
  }, [page, inputValue]);

  const handleIntersection = (entries) => {
    const target = entries[0];

    if (target.isIntersecting && !loading && !loadingMore) {
      setLoadingMore(false);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
  
    if (endOfListRef.current && !loadingMore) {
      observer.observe(endOfListRef.current);
    }
  
    return () => {
      if (endOfListRef.current) {
        observer.unobserve(endOfListRef.current);
      }
    };
  }, [endOfListRef, loadingMore]);
  

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
      <div className="ms_container my-5">
        <div className="ms_margin-top mb-4 d-flex justify-content-between align-items-center gap-3 mx-auto col-12 col-md-6 col-lg-4 flex-column flex-md-row">
          <h3 className="text-center text-white">Movies</h3>
          <input
            className="form-control w-75"
            type="text"
            placeholder="search movies"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setInputValue(e.target.value);
                setPage(1);
              }
            }}
          />
        </div>
        <div className="row justify-content-center align-items-center gy-5 mx-auto">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
        <div
          ref={endOfListRef}
          className="d-flex justify-content-center"
          style={{ minHeight: "100px" }}
        >
          {loading && (
            <div className="spinner-border text-white my-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
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

export default Movies;
