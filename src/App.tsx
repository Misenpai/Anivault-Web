import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import GetStarted from "./components/GetStarted";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Main from "./components/Main";
import "./styles/app.css";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-background">
        <div className="background-common-container">
          <div className="background-overlay"></div>
          <div className="routes-container">
            <AnimatedRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
