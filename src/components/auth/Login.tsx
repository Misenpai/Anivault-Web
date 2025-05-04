import React, { useState, useEffect } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import "../../styles/login.css";
import RevolvingProgressBar from "../RevolvingProgressBar";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { userLogin } from "../../services/api";

const Notification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="info">
    <div className="info__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        viewBox="0 0 24 24"
        height="24"
        fill="none"
      >
        <path
          fill="#393a37"
          d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718-.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
        ></path>
      </svg>
    </div>
    <div className="info__title">{message}</div>
    <div className="info__close" onClick={onClose}>
      <svg
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
          fill="#393a37"
        ></path>
      </svg>
    </div>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const direction = location.state?.direction || "right";

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/main/home", { replace: true });
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
      setSuccessMessage(`${user.name} is Logged in`);
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/main/home", { replace: true });
      }, 2000);
    } catch (error: unknown) {
      setIsLoading(false);
      const message =
        error instanceof Error ? error.message : "Invalid Email or Password";
      setError(message);
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

      {showSuccess && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="notification-wrapper"
        >
          <Notification
            message={successMessage}
            onClose={() => setShowSuccess(false)}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Login;
