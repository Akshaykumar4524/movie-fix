import React from 'react'
import { useSelector } from 'react-redux'

const MovieCard = ({ data }) => {
    const { allGenre } = useSelector((state) => state.MovieSlice)
    const genres = data?.genre_ids?.map((id) => allGenre?.find((el) => el?.id === id)?.name)

    return (
        <div className='movie-card'>
            <img className='card-image' src={'https://www.themoviedb.org/t/p/w440_and_h660_face/' + data?.poster_path} alt={data?.title} />
            <div className='card-details'>
                <h2 className='card-title' title={data?.title}>{data?.title}</h2>
                <h3>Rating: <span style={{ color: 'red' }}>{data?.vote_average}</span></h3>
                <div className='genre-id-container'>
                    {
                        genres?.map((id, index) => <span key={index} className='genre-id'>{id}</span>)
                    }
                </div>
                <p className='card-desc'>{data?.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard