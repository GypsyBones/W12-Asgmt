import React, { useState, useEffect } from "react";
import Movie from './Components/Movies';

const LIST_API = 'https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/';


function App() {
  const [ movies, setMovies ] = useState([]);
  useEffect(() => {
    fetch(LIST_API)
    .then((res) => res.json())
    .then((data) => {
      setMovies(data);
    })
  }, [])

  return (
    <div className="container">
      {movies.length > 0 && movies.map((movie) => 
      <Movie key={movie.id} {...movie} />
      )}
    </div>
  )
}


export default App;