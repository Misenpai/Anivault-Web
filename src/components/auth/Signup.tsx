import React, { useState } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import RevolvingProgressBar from "../RevolvingProgressBar";
import "../../styles/signup.css";
import "../../styles/commonbackground.css";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <div className="backgound-common-container">
      <div className="signup-content">
        <img src={anivaultLogo} alt="Anivault Logo" className="signup-logo" />
        <div className="content-box-signup">
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
        </div>
        {isLoading && <RevolvingProgressBar />}
      </div>
    </div>
  );
};

export default Signup;
