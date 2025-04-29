import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import GetStarted from "./components/GetStarted";
import Login from "./components/auth/Login";
import "./styles/app.css";
import Signup from "./components/auth/Signup";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
