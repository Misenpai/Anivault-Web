import React, { useEffect, useState } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import RevolvingProgressBar from "../RevolvingProgressBar";
import "../../styles/signup.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { userSignup } from "../../services/api";

const Notification = ({ 
  message, 
  onClose 
}: { 
  message: string; 
  onClose: () => void 
}) => (
  <div className="info">
    <div className="info__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
        <path fill="#393a37" d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718-.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"></path>
      </svg>
    </div>
    <div className="info__title">{message}</div>
    <div className="info__close" onClick={onClose}>
      <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37"></path>
      </svg>
    </div>
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/main/home", { replace: true });
    }
  }, [navigate]);

  const isValidEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      pattern.test(email) && (
        email.endsWith("@gmail.com") ||
        email.endsWith("@hotmail.com") ||
        email.endsWith("@yahoo.com") ||
        email.endsWith("@outlook.com")
      )
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
      setSuccessMessage(`${user.name} is Signed up`);
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/main/home", { replace: true });
      }, 2000);
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
      console.log("Signup error:", error);
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

export default Signup;