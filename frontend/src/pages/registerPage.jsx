import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";

const RegisterPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading , setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function Register(){
      
    if(firstName.trim() == ""){
      toast.error("First name is required");
      return;
    }
    if(lastName.trim() == ""){
      toast.error("Last name is required");
      return;
    }
    if(email.trim() == ""){
      toast.error("email is required");
      return;
    }
    if(password.trim() == ""){
      toast.error("Password is required");
      return;
    }
    if(password !== confirmPassword){
      toast.error("Password do not match");
      return;
    }
    if(password != confirmPassword){
      toast.error("Password do not match");
      return;
    }

    setIsLoading(true);

      try {
         await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/users",
          {
            email: email.trim(),
            password: password.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          }
        )
        console.log();
        navigate("/login");
        
        toast.success("Registration successful!");
        setIsLoading(false);

      } catch (error) {

        toast.error("Registration failed. Please check your data and try again.");
        
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
          className="w-[300px] h-[300px] mb-[20px] object-cover"
        />

        <h1 className="text-[50px] text-white text-shadow-secondary text-shadow-2xs text-center font-bold">
          Pug In. Power Up. Play Hard.
        </h1>

        <p className="text-[20px] text-white mt-[20px] mb-[40px] italic text-center">
          Join the ultimate gaming community. Log in to access exclusive
          features.
        </p>
      </div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col justify-center items-center ">
          <h1 className="text-[20px] font-semibold mb-[20px] text-white text-shadow-white">
            {" "}
            Register
          </h1>
          <input
            onChange={
              (e) =>{
                setFirstName(e.target.value)
              }}

            type="text"
            placeholder="your first name"
            className="w-[400px] h-[50px] mb-[20px] rounded-lg border border-secondary p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-MainText"
          />
          <input
            onChange={
              (e) =>{
                setLastName(e.target.value)
              }}

            type="text"
            placeholder="your last name"
            className="w-[400px] h-[50px] mb-[20px] rounded-lg border border-secondary p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-MainText"
          />
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
          <input
            onChange={
              (e) =>{
                setConfirmPassword(e.target.value)
              }}

            type="password"
            placeholder="confirm your Password"
            className="w-[400px] h-[50px] mb-[20px] rounded-lg border border-secondary p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-MainText"
          />
          
          <button onClick={Register} className="w-[400px] h-[50px] bg-MainText text-white font-bold text-[20px] rounded-lg border-[2px] border-secondary hover:bg-transparent hover:text-secondary ">
            Register Now
          </button>
          <p className="text-white not-italic text-center">
           Already have an account?{" "}
            <Link to="/login" className="text-MainText italic">
              Login here
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader/>}
    </div>
  );
};

export default RegisterPage;
