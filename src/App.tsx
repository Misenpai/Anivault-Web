import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router"; // Fixed import to react-router-dom
import GetStarted from "./components/GetStarted";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
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