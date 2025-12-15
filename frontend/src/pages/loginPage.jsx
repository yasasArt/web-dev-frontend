import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading , setIsLoading] = useState(false);
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
        token: response.access_token,
      }).then((res) => {
          localStorage.setItem("token", res.data.token);
          if(res.data.role == "admin") {
            navigate("/admin");
          }else {
            navigate("/")
          }
          toast.success("Login successful!.")
          setIsLoading(false);
          
      }).catch((err)=> {
        console.log(err);
      });
      setIsLoading(false);
     },

    onError: ()=> {toast.error("Google Login Failed"); },
    onNonOAuthError: () => {toast.error("Google Login Failed"); },
  })

  const navigate = useNavigate();

  async function login(){
      console.log("Login button clicked");
      console.log("Email:", email);
      console.log("password:", password);
      setIsLoading(true);

      try {
        
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
          email: email,
          password: password,
        })
        console.log(res);

        localStorage.setItem("token", res.data.token);

        if(res.data.role == "Admin"){
          navigate("/admin");
        }else{
          navigate("/");
        }

        toast.success("Login successful!");
        setIsLoading(false);
      } catch (error) {

        toast.error("Login failed. Please check your credentials.");
        
        console.log("Error during login:");
        console.log(error);
        setIsLoading(false);
      }
  }

  return (
    <div className="w-full h-screen bg-[url('/Bg.jpg')] bg-center bg-cover bg-no-repeat flex">
      <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[150px] h-[150px] mb-[20px] object-cover"
        />

        <h1 className="text-[50px] text-MainText text-shadow-secondary text-shadow-2xs text-center font-bold">
          Pug In. Power Up. Play Hard.
        </h1>

        <p className="text-[20px] text-secondary mt-[20px] mb-[40px] italic text-center">
          Join the ultimate gaming community. Log in to access exclusive
          features.
        </p>
      </div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col justify-center items-center ">
          <h1 className="text-[40px] font-bold mb-[20px] text-white text-shadow-white">
            {" "}
            Login
          </h1>
          <input
            onChange={
              (e) =>{
                setEmail(e.target.value)
              }}

            type="email"
            placeholder="your email"
            className="w-[400px] h-[50px] mb-[20px] rounded-lg border border-secondary p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-MainText"
          />
          <input
            onChange={
              (e) =>{
                setPassword(e.target.value)
              }}

            type="password"
            placeholder="Password"
            className="w-[400px] h-[50px] mb-[20px] rounded-lg border border-secondary p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-MainText"
          />
          <p className="text-white not-italic w-full mb-[20px] text-center">
            Forget your Password?
            <Link to="forgot-password" className="text-MainText italic">
                Reset it here
            </Link>
          </p>

          <button 
          onClick={login}
          className="w-[400px] h-[50px] mb-[20px] bg-MainText text-white font-bold text-[20px] rounded-lg border-[2px] border-secondary hover:bg-transparent hover:text-secondary ">
            Login
          </button>

          <button 
          onClick={googleLogin}
          className="w-[400px] h-[50px] bg-MainText text-white font-bold text-[20px] rounded-lg border-[2px] border-secondary hover:bg-transparent hover:text-secondary ">
            Login with <AiFillGoogleCircle className="inline ml-2 mb-1" />
          </button>

          <p className="text-white not-italic text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-MainText italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader/>}
    </div>
  );
};

export default LoginPage;
