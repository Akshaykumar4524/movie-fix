import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedGenre: [], allGenre: [], movieLists: {}, searchList: {} }

const MovieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setGenre: (state, action) => {
            const temp = state?.selectedGenre;
            if (temp?.includes(action?.payload)) {
                temp?.splice(temp?.indexOf(action?.payload), 1)
            } else {
                temp?.push(action?.payload)
            }
            state['selectedGenre'] = temp;
        },
        clearGenre: (state) => {
            if (state['selectedGenre']?.length !== 0) {
                state['selectedGenre'] = [];
            }
        },
        setAllGenre: (state, action) => {
            state.allGenre = action.payload;
        },
        setMovieLists: (state, action) => {
            const res = action.payload;
            const temp = state.movieLists
            state.movieLists = { ...temp, ...{ ...res } }
        },
        setSearchLists: (state, action) => {
            const res = action.payload;
            const key = Object.keys(res)?.[0];
            if (key in state?.searchList) {
                const temp = state?.searchList?.[key];
                state.searchList[key] = { ...temp, ...res[key] }
            } else {
                state.searchList = { ...state?.searchList, ...res }
            }
        }
    }
})
export const { setGenre, setAllGenre, setMovieLists, clearGenre, setSearchLists } = MovieSlice.actions
export default MovieSlice.reducer