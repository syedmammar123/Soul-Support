import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { backendUrl } from "../constants";

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const googleLogin = async () => {
    setError(false);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email } = result.user;
      console.log(result.user);

      const nameParts = displayName.split(" "); // Split by space

      // First name is the first part of the name
      let fName = nameParts[0];

      // Last name is everything else combined (in case the name has middle names)
      let lName = nameParts.slice(1).join(" ");

      const response = await axios.post(`${backendUrl}/api/v1/users/google`, {
        fName,
        lName,
        email,
        gender: "male",
      });

      const userData = await response.data.data.user;
      setAuthUser(userData);
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with google", error);
      setError("Could not sign in with google" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Clear the error after 5 seconds
      }, 5000);

      // Cleanup the timer if the component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  return { googleLogin, error, loading };
};

export default useGoogleLogin;
