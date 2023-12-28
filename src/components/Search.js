import React, { useEffect, useState } from 'react'
import "../App.css"
import { fetchData } from '../api-common/Api-Common'
import MovieCard from './MovieCard'
import useThrottle from '../hooks/UseThrottle'
import { NoMovie } from './No-Movie'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchLists } from '../state/MovieSlice'

export const Search = ({ searchText }) => {
    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalpage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const { searchList } = useSelector((state) => state?.MovieSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        const getData = async () => {
            setSearchResults([])
            setIsLoading(true)
            if ((searchText in searchList) && searchList[searchText][`page${page}`]) {
                setSearchResults(searchList[searchText]?.[`page${page}`])
                setTotalpage(searchList[searchText]?.['total_page'])
            } else {
                const res = await fetchData(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`);
                console.log(res)
                setSearchResults(res?.data?.results)
                setTotalpage(res?.data?.total_pages)
                const payload = {
                    [searchText]: {
                        'total_page': res?.data?.total_pages,
                        [`page${page}`]: res?.data?.results
                    }
                }
                dispatch(setSearchLists(payload))
            }

            setIsLoading(false)
        }
        const timer = setTimeout(() => getData(), 500)
        return () => clearTimeout(timer)
    }, [searchText])
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            if ((searchText in searchList) && searchList[searchText][`page${page}`]) {
                const temp = [...searchResults, ...searchList[searchText]?.[`page${page}`]];
                setSearchResults(temp)
                setTotalpage(searchList[searchText]?.['total_page'])
            } else {
                const res = await fetchData(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`);
                console.log(res)
                const temp = [...searchResults, ...res?.data?.results];
                setSearchResults(temp)
                const payload = {
                    [searchText]: {
                        'total_page': res?.data?.total_pages,
                        [`page${page}`]: res?.data?.results
                    }
                }
                dispatch(setSearchLists(payload))
            }


            setIsLoading(false)
        }
        if (page <= totalPage) {
            getData();
        }
    }, [page])
    const handleScroll = () => {
        throttledHandleScroll()
    }
    const throttledHandleScroll = useThrottle(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            if (!isLoading) setPage(page + 1)
        }
    }, 500);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window?.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div className='search-container'>

            <div className='movie-list'>
                {
                    searchResults?.map((movie) => <MovieCard data={movie} />)
                }
                {isLoading && <h1 className='loading-label'>Loading...</h1>}
                {!isLoading && searchResults?.length === 0 && <NoMovie isScroll={false} />}
            </div>
        </div>
    )
}
