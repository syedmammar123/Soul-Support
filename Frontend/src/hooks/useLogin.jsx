import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { backendUrl } from "../constants";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect");

  axios.defaults.withCredentials = true;

  const login = async (email, password) => {
    console.log(redirect);
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/v1/users/login`, {
        email,
        password,
      });

      const userData = response.data.data.user;
      setAuthUser(userData);

      if (userData.role === "user") {
        navigate(redirect ? redirect : "/");
      } else if (userData.role === "pro") {
        navigate(`/${redirect != undefined ? redirect : "therapist"}`);
      } else if (response.data.role === "instructor") {
        navigate("/instructor/session");
      }
      toast.success("Logged in successfully!");
    } catch (error) {
      // Handling the error by displaying a more readable message
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return { loading, login };
};
export default useLogin;
