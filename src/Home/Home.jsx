import React from "react";
import Demo from "../components/AddProductModel";

function Home() {
    
    

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
