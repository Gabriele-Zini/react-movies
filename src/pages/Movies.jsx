import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "../components/Card";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const endOfListRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

      setMovies((prevMovies) => [...prevMovies, ...moviesWithCredits]);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, 
    });
    if (endOfListRef.current) {
      observer.observe(endOfListRef.current);
    }

    return () => {
      if (endOfListRef.current) {
        observer.unobserve(endOfListRef.current);
      }
    };
  }, [endOfListRef, loading]);

  return (
    <>
      <div className="container my-5">
        <h3 className="text-center text-white mb-5">Movies</h3>
        <div className="row justify-content-start align-items-center gy-5 mx-auto">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
        <div
          ref={endOfListRef}
          className="d-flex justify-content-center"
          style={{ minHeight: "100px" }}
        >
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </>
  );
}

export default Movies;
