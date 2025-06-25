import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registers from "../assets/Register.png";
import { register } from "../utils/auth";

function Register() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    country: "",
  });

  const { email, password, name, country } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please fill out this field",
      }));
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(inputValue).forEach((key) => {
      if (!inputValue[key].trim()) {
        newErrors[key] = "Please fill out this field";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/register",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message, token } = data;
      if (success) {
        register(token);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

        setInputValue({
          email: "",
          password: "",
          name: "",
          country: "",
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="container p-5">
      <div className="row p-5" style={{ marginTop: "15px" }}>
        <div className="col-md-6 p-5">
          <img src={Registers} style={{ width: "100%" }} alt="Register" />
        </div>

        <div className="col-md-6 p-5">
          <h1 className="mb-2 fs-3 fw-bold">Register Now</h1>
          <p className="text-muted fs-5">Or track your existing application.</p>

          <form onSubmit={handleSubmit}>
            {["email", "name", "password", "country"].map((field, idx) => (
              <div key={idx} className="mb-4">
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={inputValue[field]}
                  placeholder={
                    field === "email"
                      ? "Enter your email"
                      : field === "name"
                      ? "Enter your username"
                      : field === "password"
                      ? "Enter your password"
                      : "Enter your country"
                  }
                  className="form-control rounded-pill"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                />
                {errors[field] && (
                  <small style={{ color: "red", display: "block" }}>
                    {errors[field]}
                  </small>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="btn btn-primary px-4 py-2 fw-bold d-block mx-auto mt-3"
            >
              Submit
            </button>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Register;
