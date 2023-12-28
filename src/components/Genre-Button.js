import { useDispatch, useSelector } from "react-redux";
import "../App.css"
import { clearGenre, setGenre } from "../state/MovieSlice";
const GenreButton = ({ genre }) => {
    const dispatch = useDispatch()
    const { selectedGenre } = useSelector((state) => state.MovieSlice)
    const handleClick = () => {
        if (genre?.id !== "All") {
            dispatch(setGenre(genre?.id))
        } else {
            dispatch(clearGenre())
        }

    }

    return <div className="genre-button" style={{ backgroundColor: selectedGenre?.includes(genre?.id) ? "#F0283C" : (genre?.id === "All" && selectedGenre?.length === 0) ? "#F0283C" : "" }} onClick={() => handleClick()}>{genre?.name}</div>
}

export default GenreButton;