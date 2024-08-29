import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/ui.jpg";

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameError !== "") {
      return;
    }
    if (emailError !== "") {
      return;
    }
    if (passwordError != "") {
      return;
    }

    if (nameError === "" && emailError === "" && passwordError === "") {
      try {
        console.log("formdata", formData);
        const payload = {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        };
        let response = await axios.post(
          "https://node-auth-vert.vercel.app/api/v1/user/signup",
          payload
        );
        console.log("respone", response);

        if (response.status === 201) {
          setSuccess("Registration is successfull!");
          navigate("/")
          setErr(null);
        }
      } catch (error) {
        setErr("Registration is failed.please try again later!");
        setSuccess(null);
      }
    }
  };

  useEffect(() => {
    if (formData.username !== "") {
      setNameError("");
    } else {
      setNameError("username is required!");
    }
  }, [formData.username]);

  useEffect(() => {
    if (formData.email !== "") {
      setEmailError("");
    } else {
      setEmailError("Email Id is required!");
    }
  }, [formData.email]);

  useEffect(() => {
    if (formData.password !== "") {
      setPasswordError("");
    } else {
      setPasswordError("password is required!");
    }
  }, [formData.password]);

  return (
    <div
      className="d-flex justify-content-center d-flex align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="border border-1 rounded bg-white"
        style={{ width: "33rem" }}
      >
        <h1 className=" pt-3 bg-white  text-center pt-2 pb-0 rounded-top">
          Registration
        </h1>
        <hr />
        <div className=" px-3 py-3 ">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="exampleInputPassword1" className="form-label">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
              />
              {nameError && <div className="text-danger">{nameError}</div>}
            </div>
            <div className="mb-2">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formData.email}
                onChange={handleChange}
              />
              {emailError && <div className="text-danger">{emailError}</div>}
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={formData.password}
                onChange={handleChange}
              />
              {passwordError && (
                <div className="text-danger">{passwordError}</div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary fs-5 mt-2 mb-2 px-3"
              >
                Register
              </button>
            </div>
            <div>
              <p className="text-center">
                <span>Already have an account?</span>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span
                    className="ms-2"
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Sign In
                  </span>
                </Link>
              </p>
            </div>
          </form>
          {err && <p style={{ color: "red" }}>{err}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default Registration;
