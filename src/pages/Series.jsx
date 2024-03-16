import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SeriesCard from "../components/SeriesCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Series() {
  const [series, setSeries] = useState([]);
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
      const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?`, {
        params,
      });

      const seriesData = res.data.results;
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

      setSeries((prevSeries) => [...prevSeries, ...seriesWithCredits]);
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
      threshold: 0.5,
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
      <div className="container my-5">
        <h3 className="text-center text-white mb-5 ms_margin-top">TV Series</h3>
        <div className="row justify-content-center align-items-center gy-5 mx-auto">
          {series.map((serie, index) => (
            <SeriesCard key={index} serie={serie} />
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

export default Series;
