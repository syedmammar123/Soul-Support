import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/v1/users/logout`);
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
