import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { URLS } from "../constants/apiRoute";
import { toast } from "react-toastify";

const useLogin = () => {
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = payload;

    if (!email || !password) {
      setMessage("Email or Password mismatch");
      return;
    }

    try {
      const resData = await instance.post(URLS.LOGIN, payload);
      if (resData.status === 200) {
        toast.success("Admin login successful");

        setPayload({
          email: "",
          password: "",
        });

        localStorage.setItem("token", resData.data.token);

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        toast.error("Admin login error");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error in login request");
    }
  };

  return {
    payload,
    message,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
