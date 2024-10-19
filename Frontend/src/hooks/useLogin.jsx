import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const navigate = useNavigate();
  const { redirect } = useParams();

  axios.defaults.withCredentials = true;

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        {
          email,
          password,
        }
      );

      const userData = response.data.data.user;
      setAuthUser(userData);

      localStorage.setItem("soulUser", JSON.stringify(userData));

      if (userData.role == "user") {
        navigate(`/${redirect != undefined ? redirect : ""}`);
      }
      if (userData.role == "pro") {
        navigate(`/${redirect != undefined ? redirect : "therapist"}`);

        // navigate('/therapist')
      }
      if (response.data.role == "instructor") {
        navigate("/instructor/session");
      }
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;
