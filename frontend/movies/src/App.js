import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React  from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import AdminMovies from "./pages/admin/Movies";
import MovieEditForm from "./components/admin/MovieEditForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />     
        <Route path="/movies/:id" element={<MovieDetail />} />  


        <Route path="/admin/movies" element={<AdminMovies />} />
        <Route path="/admin/movies/add" element={<MovieEditForm />} />
        <Route path="/admin/movies/edit/:id" element={<MovieEditForm />} />



      </Routes>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="App">
        HOME PAGE
    </div>
  );
};

export default App;