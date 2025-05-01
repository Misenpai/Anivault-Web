import React, { useState, useEffect } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import "../../styles/login.css";
import RevolvingProgressBar from "../RevolvingProgressBar";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { userLogin } from "../../services/api";
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const direction = location.state?.direction || "right";

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home", { replace: true });
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Invalid Email or Password");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Not a valid email address");
      setIsLoading(false);
      return;
    }
    try {
      const response = await userLogin(email, password);
      const user = {
        id: response.result.payload.id,
        name: response.result.payload.name,
        email: response.result.payload.email,
        token: response.token,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
      alert(`${user.name} is Logged in`);
      navigate("/home", { replace: true });
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (!error.response) {
          setError("Network error - check CORS configuration");
        } else {
          setError(error.response.data?.message || "Login failed");
        }
      } else {
        setError("Unexpected error occurred");
      }
      navigate("/main", { replace: true });
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
            {error && (
              <p className="error-message" style={{ color: "red" }}>
                {error}
              </p>
            )}
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
