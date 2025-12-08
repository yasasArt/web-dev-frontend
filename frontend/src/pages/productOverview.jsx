import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader";


export default function ProductOverview() {

    const params = useParams();
    const [product , setProduct] = useState(null);
    const [status , setStatus] = useState("loading"); // loading , error,success

    useEffect(() => {
        if(status == "loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
        .then((response) => {
            setProduct(response.data);
            setStatus("success");
        })
        .catch(() => {
            toast.error("Product not found");
            setStatus("error");
        });
        }
    },[])
    return (
        <>
        {
            status == "loading" && <Loader/>
        }
        {
            status == "error" && <h1 className="text-center text-2xl text-red-600 mt-10">Error loading product.</h1>
        }
        {
            status == "success" &&
            <div className="w-full h-[calc(100vh-100px)] flex ">

                <div className="w-1/2 h-full flex justify-center items-center">
                        <img
                          src={ product.images[0]}
                          className="max-w-[80%] max-h-[80%] object-contain"
                        />
                </div>
                <div className="w-1/2 h-full flex flex-col gap-6 p-10">
                    <h1 className="text-4xl font-bold text-secondary">{product.name}</h1>
                </div>
            </div>
        }

        </>
    )
}

