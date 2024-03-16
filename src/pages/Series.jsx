import { useState, useEffect } from "react";
import axios from "axios";
import SeriesCard from "../components/SeriesCard";

function Movies() {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        api_key: "7c99d77d8acb8db9c5ee5504f2096b13",
        page: page,
      };
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?`,
        { params }
      );

      // SERIES CREDITS
      const seriesData =res.data.results;
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

      setSeries(seriesWithCredits);
      console.log(seriesData);
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
      <div className="container my-5">
        <h3 className="text-center text-white mb-5">Tv Series</h3>
        <div className="row justify-content-start align-items-center gy-5 mx-auto">
          {series.map((serie, index) => (
            <SeriesCard key={index} serie={serie} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex gap-3 mt-4 align-items-center">
            <button className="btn ms_pagination-color" onClick={prevPage}>
              prev
            </button>
            <p className="text-white m-0">{page}</p>
            <button className="btn ms_pagination-color" onClick={nextPage}>
              next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movies;