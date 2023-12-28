import { useState } from "react";
import Header from "./Header";
import { MovieContainer } from "./MovieContainer";
import { Search } from "./Search";

const Layout = () => {
    const [searchText, setSearchText] = useState('')
    return (
        <>
            <Header setSearchText={setSearchText} searchText={searchText} />
            {searchText?.length > 0 ? <Search searchText={searchText} /> : <MovieContainer />}
        </>
    )
}

export default Layout;