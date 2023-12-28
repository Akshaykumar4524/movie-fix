import axios from "axios";

const fetchData = async (url) => {
    const headers= {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2NjYWQyMjc4M2JmNjM1NWQyMDJhMmQ2NzNlZDU1OSIsInN1YiI6IjY1ODY4MzI4Njg4Y2QwNTdlYjg0MTlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s3wOy26y-4eo6kJncybCx1yIIq0mo02fUFA4WE_gt-c'
      }
    try {
        const res= await axios.get(url,{headers:headers})
        return res;
    } catch (error) {
        console.log("Error", error)
    }
}

export { fetchData }