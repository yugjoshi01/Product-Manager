import React from "react";
import { useNavigate } from "react-router-dom";
import Demo from "../components/AddProductModel";

function Home() {
    const navigate=useNavigate()
    

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <form className="container-fluid justify-content-between">
        <div>
        <h1 className="ms-5">Product Manager</h1>
        </div>
        </form>
      </nav>
      <div className="mx-5 my-5">
        <Demo/>
      </div>
      
    </>
  );
}

export default Home;
