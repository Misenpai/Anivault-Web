// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router";
import { AnimatePresence } from "framer-motion";

import GetStarted from "./components/GetStarted";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Main from "./components/ui/Main";
import Home from "./components/ui/home/Home";
import "./styles/app.css";
import Search from "./components/ui/search/Search";
import Library from "./components/ui/library/Library";
import ArchiveSelected from "./components/ui/home/ArchiveSelected";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
          <Route path="archive/:year/:season" element={<ArchiveSelected />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
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
