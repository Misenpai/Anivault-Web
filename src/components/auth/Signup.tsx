import React, { useEffect, useState } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import RevolvingProgressBar from "../RevolvingProgressBar";
import "../../styles/signup.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { userSignup } from "../../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/main", { replace: true });
    }
  }, [navigate]);

  const isValidEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      pattern.test(email) &&
      (email.endsWith("@gmail.com") ||
        email.endsWith("@hotmail.com") ||
        email.endsWith("@yahoo.com") ||
        email.endsWith("@outlook.com"))
    );
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name || !email || !password || !checkPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Not a valid email address");
      setIsLoading(false);
      return;
    }

    if (password !== checkPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await userSignup(name, email, password);
      const user = {
        id: response.result.payload.id,
        name: response.result.payload.name,
        email: response.result.payload.email,
        token: response.token,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
      alert(`${user.name} is Signed up`);
      navigate("/main", { replace: true });
    } catch (error: unknown) {
      setIsLoading(false);
      let message = "Signup failed";
      if (error instanceof Error) {
        message = error.message;
      }
      if (message.includes("already exists")) {
        setError("A user with this email or name already exists");
      } else {
        setError(message);
      }
    }
  };

  const handleLoginNavigation = () => {
    navigate("/login", { state: { direction: "left" }, replace: true });
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        x: "-100vw",
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
    >
      <motion.div
        className="auth-logo-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <img src={anivaultLogo} alt="Anivault Logo" className="signup-logo" />
      </motion.div>

      <motion.div
        className="signup-content"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="content-box-signup"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vw" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h1 className="signup-welcome">
            Become a Senpai <span className="anivault-text">Today !</span>
          </h1>
          <form onSubmit={handleSignup} className="signup-form">
            <input
              type="text"
              className="signup-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              placeholder="Confirm Password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              required
            />
            {error && (
              <p className="error-message" style={{ color: "red" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className="signup-button"
              disabled={isLoading}
            >
              SIGN UP
            </button>
            <p className="login-link">
              Have an account?{" "}
              <span
                onClick={handleLoginNavigation}
                style={{
                  cursor: "pointer",
                  color: "#8a2be2",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                Login
              </span>
            </p>
          </form>
        </motion.div>
        {isLoading && <RevolvingProgressBar />}
      </motion.div>
    </motion.div>
  );
};

export default Signup;
