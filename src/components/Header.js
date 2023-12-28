import { useEffect, useState } from "react";
import "../App.css"
import { fetchData } from "../api-common/Api-Common";
import GenreButton from "./Genre-Button";
import { useDispatch, useSelector } from "react-redux";
import { setAllGenre } from "../state/MovieSlice";
const Header = ({ setSearchText, searchText }) => {
    const { allGenre } = useSelector((state) => state.MovieSlice)
    const dispatch = useDispatch();
    useEffect(() => {
        const getGenres = async () => {
            const res = await fetchData('https://api.themoviedb.org/3/genre/movie/list?language=en');
            // setGenres(res?.data?.genres);
            dispatch(setAllGenre(res?.data?.genres))
        }
        getGenres()
    }, [])
    return (
        <div className="header-container">
            <div className="header-logo">
                <div className="logo">
                    {/* MOVIEFIX */}
                    <div style={{ transform: 'rotate(-3.39deg)' }}>M</div>
                    <div style={{ transform: 'rotate(-2.076deg)' }}>O</div>
                    <div style={{ transform: 'rotate(-0.894deg)' }}>V</div>
                    <div style={{ transform: 'rotate(0.026deg)' }}>I</div>
                    <div style={{ transform: 'rotate(0.867deg)' }}>E</div>
                    <div style={{ transform: 'rotate(1.84deg)' }}>F</div>
                    <div style={{ transform: 'rotate(2.655deg)' }}>I</div>
                    <div style={{ transform: 'rotate(3.548deg)' }}>X</div>
                </div>
                <div>
                    <input className="search-Box" placeholder="search movie..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
            </div>
            {
                searchText?.length === 0 && <div className="genres-container">
                    <GenreButton genre={{ id: "All", name: "All" }} />
                    {
                        allGenre?.map((genre) => <GenreButton key={genre?.id} genre={genre} />)
                    }
                </div>
            }
        </div>
    )
}
export default Header;