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

        setMovies(res.data.results);
        console.log(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
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
        <div>
          {/*  { movies.map
        
        <Card/>} */}
        </div>
      </div>
    </>
  );
}

export default App;
