import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../constants";
import toast from "react-hot-toast";

const useRegister = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  axios.defaults.withCredentials = true;

  const registeration = async (
    fName,
    lName,
    email,
    password,
    confirmPassword,
    gender,
    setRegister
  ) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (
      !confirmPassword ||
      !password ||
      !email ||
      !fName ||
      !lName ||
      !gender
    ) {
      alert("Please fill all fields before registering.");
      return;
    }

    try {
      setRegisterLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/v1/users/register`,
        {
          fName,
          lName,
          email,
          password,
          gender,
        }
      );
      toast.success('Registered successfully! Please login to continue');
      console.log(response.data);
      setRegister(false);
    } catch (error) {
      console.error(error);
      toast.error("error in registeration! Try again");
    } finally {
      setRegisterLoading(false);
    }
  };
  return { registeration, registerLoading };
};

export default useRegister;
