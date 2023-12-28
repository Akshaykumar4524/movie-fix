import React, { useEffect, useRef, useState } from 'react'
import "../App.css"
import MovieList from './MovieList'
import { fetchData } from '../api-common/Api-Common';
import useThrottle from '../hooks/UseThrottle';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieLists } from '../state/MovieSlice';

export const MovieContainer = () => {
    const [yearsOnDom, setYearsOnDom] = useState([2012])
    const { selectedGenre } = useSelector((state) => state.MovieSlice)

    const [isTopScroll, setIsTopScroll] = useState(false)
    const [isLoadingList, setLoadingList] = useState(false)
    const [isfirstTimeLoading, setIsFirstTimeLoading] = useState(0)

    const handleScroll = () => {
        throttledHandleScroll();
    }
    const throttledHandleScroll = useThrottle(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            if (!isLoadingList) {
                let temp = yearsOnDom;
                const year = temp[temp?.length - 1] + 1
                if (year <= 2023) {
                    temp.push(year)
                    temp.sort()
                    if (temp?.length > 3) {
                        temp?.shift()
                    }
                    setYearsOnDom([...temp])
                }

                setIsTopScroll(false)
                setIsFirstTimeLoading(isfirstTimeLoading + 1)
            }

        }
        if (document.documentElement.scrollTop === 0) {
            if (!isLoadingList) {
                let temp = yearsOnDom;
                const year = temp[0] - 1
                temp.push(year)
                temp.sort()
                if (temp?.length > 3) {
                    temp?.pop()
                }
                setYearsOnDom([...temp])
                setIsTopScroll(true)
                setIsFirstTimeLoading(isfirstTimeLoading + 1)
            }



        }
    }, 500);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isTopScroll) {
            window.scrollTo(0, 100)
        }
    }, [yearsOnDom])

    useEffect(() => {
        if (isfirstTimeLoading === 0 && !isLoadingList) {
            handleScroll()
        }
    }, [isLoadingList])

    useEffect(() => {
        setIsTopScroll(false)
        setIsFirstTimeLoading(0)
        setYearsOnDom([2012])
    }, [selectedGenre])

    return (
        <div className='movie-container'>
            {yearsOnDom?.map((movieList) => <MovieList key={movieList} year={movieList} setLoadingList={setLoadingList} />)}
        </div>
    )
}
