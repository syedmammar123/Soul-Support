import axios from "axios";
import { useState } from "react";


const useAssessment = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
          const response = await axios.get("/api/v1/quiz/");
          setCategories(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          alert("Error!");
        }
      };
  return {loading, categories, fetchCategories}
}

export default useAssessment