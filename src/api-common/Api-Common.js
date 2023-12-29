import axios from "axios";

const fetchData = async (url) => {
    const headers= {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    try {
        const res= await axios.get(url,{headers:headers})
        return res;
    } catch (error) {
        console.log("Error", error)
    }
}

export { fetchData }