import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserData(){
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("user");
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: {
                    Authorization : `Bearer ${token}`,
                },
            }).then((response)=>{
                setUser(response.data);
            }).catch((error)=> {
                if(error.response?.status === 401){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
                setUser(null);
            })
        }
    },[navigate])

    return (
        <>
        {
            user ?
            <div className ="w-[150px] flex flex-row">
                {/* <img src={user.image} className="w-[50px] rounded-full h-[50px]" 
                /> */}
                <img src="/default.jpg" className="w-[50px] rounded-full h-[50px]" 
                />
                <select className="bg-transparent outline-none ml-2 mt- text-white" value={selectedOption}
                onChange={
                    (e)=>{
                        if(e.target.value == "logout"){
                            localStorage.removeItem("token");
                            navigate("/login");
                        }else if(e.target.value == "my-orders"){
                            navigate("/orders");
                        }
                        setSelectedOption("user")
                    }
                }
                >
                    <option className="bg-secondary" value={"user"}>{user.firstName}</option>
                    <option className="bg-secondary" value={"logout"}>Logout</option>
                    <option className="bg-secondary" value={"my-orders"}>My Orders</option>
                </select>
            
            </div>:
            <div>
                <Link to="/login" className="mx-2 px-4 py-2 bg-white text-secondary rounded-full">Login</Link>
                <Link to="/register" className="mx-2 px-4 py-2 bg-white text-secondary rounded-full">Register</Link>
            </div>
        }
        </>
    ) 
}