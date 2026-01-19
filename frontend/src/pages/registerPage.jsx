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
        <h1 className="text-[28px] md:text-[40px] font-semibold mb-[20px] text-white text-center">
          Register
        </h1>

        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="your first name"
          className="w-full h-[50px] mb-[20px] rounded-lg border p-[10px] text-[16px] md:text-[20px] focus:outline-none"
        />

        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="your last name"
          className="w-full h-[50px] mb-[20px] rounded-lg border p-[10px] text-[16px] md:text-[20px] focus:outline-none"
        />

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="your email"
          className="w-full h-[50px] mb-[20px] rounded-lg border p-[10px] text-[16px] md:text-[20px] focus:outline-none"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full h-[50px] mb-[20px] rounded-lg border p-[10px] text-[16px] md:text-[20px] focus:outline-none"
        />

        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="confirm your Password"
          className="w-full h-[50px] mb-[20px] rounded-lg border p-[10px] text-[16px] md:text-[20px] focus:outline-none"
        />

        <button
          onClick={Register}
          className="w-full h-[50px] bg-MainText text-white font-bold text-[18px] rounded-lg border-[2px] hover:bg-transparent"
        >
          Register Now
        </button>

        <p className="text-white text-sm md:text-base text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 italic">
            Login here
          </Link>
        </p>
      </div>
    </div>

    {isLoading && <Loader />}
  </div>

  );
};

export default RegisterPage;
