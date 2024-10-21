import axios from "axios";
import { useState } from "react";


const useLiveSession = () => {
    axios.defaults.withCredentials = true;
    const[loading, setLoading] = useState(false)

  const fetchAllSessions = async (setSessionData) => {
    setLoading(true)
    try {
      const response = await axios.get("/api/v1/session/all");

      const data = response.data.message;
      data[0].dateTime = new Date();
      setSessionData(data);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "No Session Found!!"
      ) {
        alert("no data in database :(");
      }
    }
    finally{
        setLoading(false)
    }
  };
  return {fetchAllSessions,loading}
}

export default useLiveSession