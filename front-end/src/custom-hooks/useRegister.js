import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { URLS } from "../constants/apiRoute";
import { toast } from "react-toastify";

const useRegister = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in as admin");
      return;
    }

    try {
      const response = await instance.post(URLS.REGISTER, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Admin registration successful!");
        setPayload({
          name: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      } else {
        toast.error("Admin registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("You are not a super admin!");
    }
  };

  return {
    payload,
    handleChange,
    handleSubmit,
  };
};

export default useRegister;
