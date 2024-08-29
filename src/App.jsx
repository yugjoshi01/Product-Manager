import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import Login from "./Login/Login";
import Registration from "./Registration/Registration";


function App() {
  

  return (
    <>
      <BrowserRouter>
      <MantineProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Registration/>}/>
      </Routes>
      </MantineProvider>
      </BrowserRouter>
    </>
  )
}

export default App
