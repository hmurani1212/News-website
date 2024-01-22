import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import React, { useState } from "react";
import Navbar from './components/Navbar';
import News from './components/News';
import Registeration from "./components/Registeration";
import Login from "./components/Login";
import Profile from "./components/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<News country="us" key="general" catagory="general" Headlines="general" />} />
            <Route exact path="/entertainment" element={<News country="us" key="technology" catagory="entertainment" Headlines="Entertainment" />} />
            <Route exact path="/business" element={<News country="us" key="business" catagory="business" Headlines="Business" />} />
            <Route exact path="/health" element={<News country="us" key="health" catagory="health" Headlines="Health" />} />
            <Route exact path="/science" element={<News country="us" key="science" catagory="science" Headlines="Science" />} />
            <Route exact path="/sports" element={<News country="us" key="sports" catagory="sports" Headlines="Sports" />} />
            <Route exact path="/technology" element={<News country="us" key="technology" catagory="technology" Headlines="Technology" />} />
              <Route path="Registeration" element={<Registeration />} />
              <Route path="Login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
