import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";



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
                       <ImageSlider images={product.images}/>
                </div>
                <div className="w-1/2 h-full flex flex-col gap-6 p-10">
                    <h1 className="text-4xl font-bold text-secondary/80">{product.name}</h1>
                    <h2 className="text-lg text-secondary/80 ">{product.productID}</h2>
                    <h3 className="text-lg text-secondary/80 flex items-center"><cgchevronRight/>{product.category}</h3>
                    <p className="text-md text-justify text-secondary/90 h-32 overflow-y-auto">
                    {product.description}
                    </p>
                    <div className="w-full flex flex-col items-start gap-2 mt-4">
                        {product.labelledPrice > product.price && (
                            <h2 className="text-secondary/80 line-through decoration-red-700 decoration-2 mr-2 text-2xl">
                                LKR. {product.labelledPrice.toFixed(2)}
                            </h2>

                        )}
                        <h2 className="text-black font-semibold text-3xl">
                            LKR.{product.price.toFixed(2)}
                        </h2>
                    </div>
                    <div className="w-full flex flex-row gap-4 mt-4">
                        <button 
                        onClick={()=>{
                            addToCart(product, 1)
                        }}
                        className="bg-secondary text-white px-6 py-2 rounded hover:bg-black/70 transition">
                            Add to Cart
                        </button>

                        <button 
                        onClick={()=>{
                            console.log(getCart())
                        }}
                        className="bg-gray-200 text-MainText px-6 py-2 rounded hover:bg-gray-300 transition">
                            Buy Now 
                            </button> 
                    </div>
                </div>
            </div>
        }

        </>
    )
}

