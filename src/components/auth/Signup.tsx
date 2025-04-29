import React, { useState } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import RevolvingProgressBar from "../RevolvingProgressBar";
import "../../styles/signup.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Signup attempted with: ", {
        email,
        password,
        checkPassword,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Signup failed:", error);
    }
  };

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        x: "100vw",
        transition: { duration: 0.5 },
      }}
    >
      <motion.div
        className="signup-content"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <motion.img
          src={anivaultLogo}
          alt="Anivault Logo"
          className="signup-logo"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        />
        <motion.div
          className="content-box-signup"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
        >
          <h1 className="signup-welcome">
            Become a Senpai <span className="anivault-text">Today !</span>
          </h1>
          <form onSubmit={handleSignup} className="signup-form">
            <input
              type="email"
              className="signup-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="signup-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="signup-input"
              placeholder="Check Password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="signup-button"
              disabled={isLoading}
            >
              SIGN UP
            </button>
            <p className="login-link">
              Have an account? <a onClick={handleLoginNavigation}>Login</a>
            </p>
          </form>
        </motion.div>
        {isLoading && <RevolvingProgressBar />}
      </motion.div>
    </motion.div>
  );
};

export default Signup;
