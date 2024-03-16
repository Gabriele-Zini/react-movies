import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import Movies from "./pages/Movies.jsx"
import Series from "./pages/Series.jsx"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />

      <Routes>
          <Route index element={<App />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-series" element={<Series />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
