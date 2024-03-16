import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Header from "./components/Header.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
   
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index /* element={<Home />} */ />
          <Route path="blogs" /* element={<Blogs />} */ />
          <Route path="contact" /* element={<Contact />} */ />
        </Route>
      </Routes>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
)
