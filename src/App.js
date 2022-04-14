import './App.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Movie from './Movie';
import Filter from './Filter';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=45cbb464af3ce929448d2795ed6b2c0d&language=en-US&page=1'
    );
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  return (
    <div className='App'>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className='popular-movies'>
        <AnimatePresence>
          {filtered.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
