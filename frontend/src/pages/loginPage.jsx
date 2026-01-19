import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import Loader from "../components/loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
          token: response.access_token,
        });
        localStorage.setItem("token", res.data.token);

        // Normalize role to lowercase
        const role = res.data.role?.toLowerCase();
        if (role === "admin") navigate("/admin");
        else navigate("/");

        toast.success("Login successful!");
      } catch (err) {
        console.log(err);
        toast.error("Google Login Failed");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error("Google Login Failed"),
    onNonOAuthError: () => toast.error("Google Login Failed"),
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  });

  


  async function login() {
    console.log("Login button clicked", email, password);
    setIsLoading(true);

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      // Normalize role to lowercase
      const role = res.data.role?.toLowerCase();
      if (role === "admin") navigate("/admin");
      else navigate("/");

      toast.success("Login successful!");
    } catch (error) {
      console.log("Error during login:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
          <div className="w-full h-screen bg-[url('/Bg.jpg')] bg-center bg-cover bg-no-repeat flex flex-col md:flex-row">
        {/* Left side */}
        <div className="w-full md:w-[50%] h-auto md:h-full flex justify-center items-center flex-col p-6 md:p-[50px] hidden md:flex">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mb-[20px] object-cover"
          />
          <h1 className="text-[28px] md:text-[50px] text-white text-center font-bold">
            Pug In. Power Up. Play Hard.
          </h1>
          <p className="text-[16px] md:text-[20px] text-white mt-[20px] mb-[40px] italic text-center">
            Join the ultimate gaming community. Log in to access exclusive features.
          </p>
        </div>

        {/* Right side */}
        <div className="w-full md:w-[50%] h-full flex justify-center items-center px-4">
          <div className="w-full max-w-[450px] h-auto md:h-[600px] backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col justify-center items-center p-6">
            <h1 className="text-[28px] md:text-[40px] font-bold mb-[20px] text-white text-center">
              Login
            </h1>

            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] mb-[20px] rounded-lg border p-[10px] text-[16px] md:text-[20px] focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] mb-[20px] rounded-lg border p-[10px] text-[16px] md:text-[20px] focus:outline-none"
            />

            <p className="text-white text-sm md:text-base mb-[20px] text-center">
              Forget your Password?{" "}
              <Link to="forgot-password" className="text-blue-400 italic">
                Reset it here
              </Link>
            </p>

            <button
              onClick={login}
              className="w-full h-[50px] mb-[20px] bg-MainText text-white font-bold text-[18px] rounded-lg border-[2px] hover:bg-transparent"
            >
              Login
            </button>

            <button
              onClick={googleLogin}
              className="w-full h-[50px] bg-MainText text-white font-bold text-[18px] rounded-lg border-[2px] hover:bg-transparent"
            >
              Login with <AiFillGoogleCircle className="inline ml-2 mb-1" />
            </button>

            <p className="text-white text-sm md:text-base text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-400 italic">
                Register here
              </Link>
            </p>
          </div>
        </div>

        {isLoading && <Loader />}
      </div>

  );
};

export default LoginPage;
