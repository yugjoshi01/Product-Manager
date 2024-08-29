import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/ui.jpg";

function Login() {
  const [data, setData] = useState({
    Email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const payLoad={
    email:data.Email,
    password:data.password
  }
  const navigate=useNavigate()

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const[successLog,setSuccessLog]=useState(null);
  const[errLog,setErrLog]=useState(null)


  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    if (emailError !== "") {
      return
    }
    if(passwordError!==""){
        return
    }

    if(emailError==="" && passwordError===""){
      setLoading(true)
        try{
          let res=await axios.post('https://node-js-api-ebon.vercel.app/api/v1/user/login',payLoad)
          console.log("first",res.data.data.token)
          if(res?.data?.statusCode===200){
            setSuccessLog("loging is successfull!");
            setLoading(false)
            navigate("/home");
            localStorage.setItem("userid",res.data.data.id);
            localStorage.setItem("token",res?.data?.data?.token)
            setErrLog(null)
          }
        }catch(error){
          setErrLog("loging is failed!")
          setSuccessLog(null)
        }
    }
    
  };

  useEffect(() => {
    if (data.Email !== "") {
      setEmailError("");
    } else {
      setEmailError("Email is required!");
    }
  }, [data.Email]);

  useEffect(() => {
    if (data.password !== "") {
        setPasswordError("");
    } else {
        setPasswordError("Password is required!");
    }
  }, [data.password]);

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
        style={{ width: "35rem" }}
      >
        <h1 className="pb-3 bg-white  text-center p-3 rounded-top">Sign In</h1>
        <hr />
        <div className=" px-3 py-3 ">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                name="Email"
                type="Email"
                id="exampleInputEmail1"
                value={data.Email}
                className="form-control"
                onChange={handleChangeLogin}
              />
              {emailError &&<div className="text-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={data.password}
                onChange={handleChangeLogin}
              />
              {passwordError &&<div className="text-danger">{passwordError}</div>}
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary fs-5 my-4 px-3"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
            <div>
              <p className="text-center">
                <span>Don't have an account?</span>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <span
                    className="ms-2"
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Register
                  </span>
                </Link>
              </p>
            </div>
          </form>
          {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) :(<>
          {errLog && <p style={{ color: "red" }}>{errLog}</p>}
          {successLog && <p style={{ color: "green" }}>{successLog}</p>}

          </>)}
        </div>
      </div>
    </div>
  );
}

export default Login;
