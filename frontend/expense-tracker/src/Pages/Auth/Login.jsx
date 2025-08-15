import React, {useContext, useState } from "react";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import "./AuthForm.css"; // CSS from your original file
import {
  FaFacebookF,
  FaGooglePlusG,
  FaLinkedinIn,
  FaHeart,
  FaTrophy,
} from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../Utils/Helper"; // Importing the email validation function
import axiosInstance from "../../Utils/axiosInstance";
import {API_PATHS} from "../../Utils/apiPath"; 
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  // Function to handle the click on "Sign Up" or "Sign In" buttons
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    setError(null); // Clear any previous error messages
    // Reset form fields
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    setError(null); // Clear any previous error messages
    // Reset form fields
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number & one special character."
      );
      return;
    }
    setError("");

    // Simulate an API call for login

    try {     
      const response  = await axiosInstance.post(API_PATHS.Auth.LOGIN, {
        email,
        password, 
      });
      const { token, user} = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        window.location.href = "/dashboard"; // Force reload to re-init context
      }
    }catch (error) {
      if(error.response && error.response.status === 401) {
        setError(error.response.data.message || "Invalid email or password");
      }else {
        setError("An error occurred while logging in. Please try again later.");
      }
    }
    
  };

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number & one special character"
      );
      return;
    }
    setError("");
    // Simulate an API call for sign-up

    try{
      const response = await axiosInstance.post(API_PATHS.Auth.REGISTER, {
        fullName,
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token); // Store the token in local storage
        updateUser(user); // Update user context with the signed-up user data
        window.location.href = "/dashboard"; // Force reload to re-init context
      } 
    }catch (error) {
      if(error.response && error.response.status === 400) {
        setError(error.response.data.message || "Sign up failed. Please try again.");
      }else {
        setError("An error occurred while signing up. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl px-4">
        <div
          className={`container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <FaFacebookF />
                </a>
                <a href="#" className="social">
                  <FaGooglePlusG />
                </a>
                <a href="#" className="social">
                  <FaLinkedinIn />
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {error && <p className="errorText">{error}</p>}
              <button className="authForm" type="button" onClick={handleSignUp}>
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <FaFacebookF />
                </a>
                <a href="#" className="social">
                  <FaGooglePlusG />
                </a>
                <a href="#" className="social">
                  <FaLinkedinIn />
                </a>
              </div>
              <span>or use your account</span>

              <input
                type="email"
                placeholder="vishal@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Min 8 Charatcers"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              {error && <p className="errorText">{error}</p>}
              <a href="#">Forgot your password?</a>
              <button className="authForm" type="button" onClick={handleLogin}>
                Sign In
              </button>
            </form>
          </div>

          {/* Overlay Panel */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal
                  info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
