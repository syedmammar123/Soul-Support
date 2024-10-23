import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../constants";
import toast from "react-hot-toast";


const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/api/v1/users/logout`);
      setAuthUser(null);
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
