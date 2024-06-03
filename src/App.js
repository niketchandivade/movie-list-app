import { useEffect, useState } from 'react';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Menu from './Components/Menu/Menu';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css'

const App = () => {
  const [menus, setMenus] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMore, setViewMore] = useState(false);

  const fetchGenres = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setMenus([{ name: 'All', id: 0 }, ...JSON.parse(result)?.genres]);
      })
      .catch((error) => console.error(error));
  };

  const fetchMovies = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const parsedResponse = JSON.parse(result);
        setMovies(parsedResponse?.results);
        setPage(parsedResponse?.page);
        setViewMore(parsedResponse?.page < parsedResponse?.total_pages);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchGenres();
    fetchMovies(1);
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [selectedGenre]);

  useEffect(() => {
    setFilteredMovies(
      selectedGenre !== 0
        ? movies?.filter((movie) => movie?.genre_ids?.includes(selectedGenre))
        : movies
    );
  }, [movies]);

  const fetchMoreMovies = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=${
        page + 1
      }&vote_count.gte=100`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const parsedResponse = JSON.parse(result);
        setMovies((prevItems) => [...prevItems, ...parsedResponse?.results]);
        setPage(parsedResponse?.page);
        setViewMore(parsedResponse?.page < parsedResponse?.total_pages);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <Header title={'MOVIEFIX'} />
      <Menu
        menus={menus}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <div className='listing-container'>
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreMovies}
          hasMore={viewMore}
          loader={<div className='loader'>Loading...</div>}
        >
          <List movies={filteredMovies} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default App;
