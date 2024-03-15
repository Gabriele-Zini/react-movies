import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";

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
        console.log(moviesWithCredits);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex gap-3 mt-4">
          <button className="btn btn-primary" onClick={prevPage}>
            prev
          </button>
          <p>{page}</p>
          <button className="btn btn-primary" onClick={nextPage}>
            next
          </button>
        </div>
        <div className="my-4 row justify-content start g-4">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
