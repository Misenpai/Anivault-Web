import React, { useState } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import "../../styles/login.css";
import RevolvingProgressBar from "../RevolvingProgressBar";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const direction = location.state?.direction || "right";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Login attempted with:", { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
    }
  };

  const handleSignupNavigation = () => {
    navigate("/signup", { state: { direction: "right" }, replace: true });
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        x: "100vw",
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
    >
      <motion.div
        className="auth-logo-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <img src={anivaultLogo} alt="Anivault Logo" className="login-logo" />
      </motion.div>

      <motion.div
        className="login-content"
        initial={{ x: direction === "left" ? "100vw" : "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="content-box-login"
          initial={{ x: direction === "left" ? "100vw" : "-100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "100vw" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h1 className="login-welcome">
            Welcome back <span className="anivault-text">Senpai !!</span>
          </h1>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-button" disabled={isLoading}>
              LOGIN
            </button>

            <p className="signup-link">
              Don't have an account?{" "}
              <span
                onClick={handleSignupNavigation}
                style={{
                  cursor: "pointer",
                  color: "#8a2be2",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                Signup
              </span>
            </p>
          </form>
        </motion.div>
        {isLoading && <RevolvingProgressBar />}
      </motion.div>
    </motion.div>
  );
};

export default Login;
