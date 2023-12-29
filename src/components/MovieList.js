import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { fetchData } from '../api-common/Api-Common';
import { useDispatch, useSelector } from 'react-redux';
import { NoMovie } from './No-Movie';
import { setMovieLists } from '../state/MovieSlice';

const MovieList = ({ year, setLoadingList }) => {
  const dispatch = useDispatch()
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedGenre, movieLists } = useSelector((state) => state.MovieSlice)

  useEffect(() => {
    const getData = async () => {
      setLoadingList(true)
      setIsLoading(true)
      setMovieList([])
      const key = `${year},${selectedGenre?.toString()}`
      if (key in movieLists) {
        setMovieList(movieLists[key])
      } else {
        const res = await fetchData(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_TOKEN}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=20&with_genres=${selectedGenre.toString()}`)
        setMovieList(res?.data?.results)
        const payload = { [key]: res?.data?.results }
        dispatch(setMovieLists(payload))
      }
      setIsLoading(false);
      setLoadingList(false)

    }
    getData()
  }, [selectedGenre])
  if (isLoading) {
    return (
      <h1 className='loading-label'>Loading...</h1>
    )
  }
  return (
    <div>
      <h1 className='year-label'>{year}</h1>
      {movieList?.length === 0 && !isLoading && <NoMovie isScroll={true} />}
      <div className='movie-list'>
        {
          movieList?.map((movie) => <MovieCard key={movie?.id} data={movie} />)
        }
      </div>
    </div>
  )
}

export default MovieList