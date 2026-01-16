import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import { BiCaretRightCircle } from "react-icons/bi";

export default function ProductOverview() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // loading, error, success

    useEffect(() => {
        if (status === "loading") {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
                .then((response) => {
                    setProduct(response.data);
                    setStatus("success");
                })
                .catch(() => {
                    toast.error("Product not found");
                    setStatus("error");
                });
        }
    }, [status, params.productID]);

    return (
        <>
            {status === "loading" && <Loader />}

            {status === "error" && (
                <h1 className="text-center text-2xl text-red-600 mt-10">
                    Error loading product.
                </h1>
            )}

            {status === "success" && product && (
                <div className="w-full min-h-[calc(100vh-100px)] bg-gray-50">

                    {/* Mobile Title */}
                    <h1 className="lg:hidden text-3xl font-bold text-center sticky top-0 bg-white shadow py-4 z-10">
                        {product.name}
                    </h1>

                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 p-6 lg:p-10">

                        {/* IMAGE SECTION */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
                                <ImageSlider images={product.images} />
                            </div>
                        </div>

                        {/* DETAILS SECTION */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-6">

                            {/* Desktop Title */}
                            <h1 className="hidden lg:block text-4xl font-bold text-gray-900">
                                {product.name}
                            </h1>

                            {/* Product Meta */}
                            <div className="flex flex-col gap-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <BiCaretRightCircle />
                                    {product.category}
                                </span>
                                <span className="font-mono">
                                    Product ID: {product.productID}
                                </span>
                            </div>

                            {/* Alternative names */}
                            {product.altNames && product.altNames.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {product.altNames.map((name, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-full border"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed text-justify max-h-36 overflow-y-auto pr-2">
                                {product.description}
                            </p>

                            {/* PRICE */}
                            <div className="flex flex-col gap-1">
                                {product.labelledPrice > product.price && (
                                    <span className="text-gray-400 line-through text-lg">
                                        LKR. {product.labelledPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-3xl font-extrabold text-gray-900">
                                    LKR. {product.price.toFixed(2)}
                                </span>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex gap-4 mt-6 flex-wrap">
                                <button
                                    onClick={() => {
                                        addToCart(product, 1);
                                        toast.success("Added to cart");
                                    }}
                                    className="px-8 py-3 rounded-full bg-secondary text-white font-medium shadow hover:bg-black/80 transition"
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() => {
                                        const singleItem = {
                                            productID: product.productID,
                                            name: product.name,
                                            price: product.price,
                                            labelledPrice: product.labelledPrice,
                                            image: product.images ? product.images[0] : "",
                                            quantity: 1
                                        };

                                        navigate("/checkout", {
                                            state: [singleItem]
                                        });
                                    }}
                                    className="px-8 py-3 rounded-full bg-white border border-gray-300 font-medium shadow hover:bg-gray-100 transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
