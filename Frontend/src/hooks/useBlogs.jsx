import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../constants";

const useBlogs = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (setBlogs) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/v1/blogs`);
      for (let i = 0; i < res.data.data.length; i++) {
        let slicedContent = res.data.data[i].content.slice(0, 180);
        res.data.data[i].displaytext = slicedContent;
      }
      setBlogs(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData,loading };
};

export default useBlogs;
