import React, { useState } from "react";
import anivaultLogo from "../../../public/assets/anivault_logo.png";
import "../../styles/login.css";
import "../../styles/commonbackground.css";
import RevolvingProgressBar from "../RevolvingProgressBar";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    navigate("/signup");
  };

  return (
    <div className="backgound-common-container">
      <div className="login-content">
        <img src={anivaultLogo} alt="Anivault Logo" className="logo" />
        <div className="content-box-login">
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
              <a onClick={handleSignupNavigation}>Signup</a>
            </p>
          </form>
        </div>
        {isLoading && <RevolvingProgressBar />}
      </div>
    </div>
  );
};

export default Login;
