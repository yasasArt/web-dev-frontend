import { useState } from "react";

export default function Test() {

    const [count , setCount ] = useState(0)
    const [status , setStatus] = useState("Hello")

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[300px] h-[300px] shadow-2xl flex justify-center items-center text-center">
                <button className="w-[100px] h-[50px] bg-red-500 text-white"
                onClick={()=>{
                    setCount(count - 1)
                }}>
                    Decrement
                </button>

                <h1 className="w-[100px] h-[50px] text-[30px]">{count}</h1>

                <button onClick={()=>{
                    setCount(count + 1)
                }} 
                className="w-[100px] h-[50px] bg-blue-600 text-white">
                    Increment
                </button>

            </div>

            <div className="w-[300px] h-[300px] shadow-2xl flex flex-col justify-center items-center text-center">
                <span className=" h-[30px] text-2xl font-bold">
                    {status}
                </span>
                <div className="w-full h-[50px] ">
                    <button className="w-[100px] h-full bg-red-600 text-white"
                    onClick={()=>{
                        setStatus("Good afternoon")
                    }}>
                        off
                    </button>
                    <button className="w-[100px] h-full bg-green-600 text-white"
                    onClick={()=>{
                        setStatus("Good morning")
                    }}>
                        on
                    </button>
                </div>
                
            </div>

        </div>
    )
}