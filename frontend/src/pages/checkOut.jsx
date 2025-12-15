import { useState } from "react";
import { BiSolidChevronUp } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart, addToCart } from "../utils/cart"; 
import axios from "axios";
import toast from "react-hot-toast";


export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [address , setAddress] = useState("");
    const [phone , setPhone] = useState("");

    const [cart, setCart] = useState(getCart());

    if(location.state == null){
        navigate("/products");
    }

    function getCartTotal(){
        let total = 0;
        cart.forEach((item) =>{
            total += item.price * item.quantity
        }
        )
        return total;
    }
    
    // Create a handler function to ensure proper item format
    const handleQuantityChange = (item, change) => {
        // Ensure the item has all required properties
        const productToUpdate = {
            productID: item.productID,
            name: item.name,
        };
        
        addToCart(productToUpdate, change);
        // Update the cart state after a short delay to allow toast to show
        setTimeout(() => {
            setCart(getCart());
        }, 50);
    };

    async function  submitOrder(){
        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("You must be logged in to place an order");
            navigate("/login");
            return;
        }

        const orderItems = []

        cart.forEach((item) => {
            orderItems.push({
                productID: item.productID,
                quantity: item.quantity
            })
        });

        axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", {
            name:name,
            address: address,
            phone: phone,
            items: orderItems
        },{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    ).then(() => {
        toast.success("Order placed successfully");
        navigate("/orders");
    }).catch(() => {
        toast.error("Error placing order");
    });
        
    }

    return (
         <div className="w-full flex flex-col items-center p-4 sm:p-6">
            {cart.length === 0 ? (
                <div className="text-center text-gray-500 text-xl mt-10">
                    Your cart is empty
                </div>
            ) : (
                cart.map((item, index) => (
                    <div
                        key={index}
                        className="w-full lg:w-[50%] lg:h-[175px] p-4 relative rounded-xl overflow-hidden shadow-2xl my-2 flex flex-col lg:flex-row justify-between gap-4"
                    >
                        <h1 className="lg:hidden w-full text-sm font-semibold truncate">
                            {item.name}
                        </h1>

                        <div className="h-full flex flex-col">
                            <img
                                src={item.image}
                                className="h-[100px] w-[100px] lg:h-full lg:w-auto aspect-square object-cover rounded"
                            />

                            <div className="lg:hidden">
                                {item.labelledPrice && item.labelledPrice > item.price && (
                                    <h2 className="text-secondary/80 line-through decoration-red-700">
                                        LKR. {item.labelledPrice.toFixed(2)}
                                    </h2>
                                )}
                                <h2 className="text-lg font-semibold">
                                    LKR. {item.price.toFixed(2)}
                                </h2>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col justify-center pl-4 flex-1">
                            <h1 className="text-2xl font-semibold">
                                {item.name.length > 20
                                    ? item.name.substring(0, 20) + "..."
                                    : item.name}
                            </h1>

                            {item.description && (
                                <p className="text-gray-600 mt-1">
                                    {item.description.length > 50
                                        ? item.description.substring(0, 50) + "..."
                                        : item.description}
                                </p>
                            )}

                            <div className="flex items-center mt-2">
                                {item.labelledPrice && item.labelledPrice > item.price && (
                                    <h2 className="text-secondary/80 line-through decoration-red-700 mr-2">
                                        LKR. {item.labelledPrice.toFixed(2)}
                                    </h2>
                                )}
                                <h2 className="text-xl font-semibold">
                                    LKR. {item.price.toFixed(2)}
                                </h2>
                            </div>
                        </div>

                        <div className="min-h-full flex flex-row items-center gap-4">
                            <div className="h-full flex flex-col justify-center items-center">
                                <BiSolidChevronUp
                                    onClick={() => {
                                        handleQuantityChange(item, 1);
                                        const copiedCart = [...cart];
                                        copiedCart[index].quantity += 1;
                                        setCart(copiedCart);
                                    }}
                                    className="text-2xl cursor-pointer"
                                />
                                <span className="text-lg">{item.quantity}</span>
                                <BiSolidChevronUp
                                    onClick={() => {
                                        handleQuantityChange(item, -1);
                                        const copiedCart = [...cart];
                                        copiedCart[index].quantity -= 1;
                                        if (copiedCart[index].quantity < 1) {
                                            copiedCart.splice(index, 1);
                                        }
                                        setCart(copiedCart);
                                    }}
                                    className="rotate-180 text-2xl cursor-pointer"
                                />
                            </div>

                            <span className="text-lg font-semibold">
                                LKR. {(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))
            )}

            {/* CUSTOMER DETAILS */}
            <div className="w-full lg:w-[50%] p-4 rounded-xl shadow-2xl my-3 flex flex-col gap-4">
                <div className="flex flex-col">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-3 rounded border-2 border-secondary/30 w-full"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Phone</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="px-4 py-3 rounded border-2 border-secondary/30 w-full"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="px-4 py-3 rounded border-2 border-secondary/30 w-full"
                    />
                </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="w-full lg:w-[50%] rounded-xl shadow-2xl my-3 flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
                <button
                    onClick={submitOrder}
                    className="w-full sm:w-auto px-6 py-3 bg-secondary text-white rounded"
                >
                    Order Now
                </button>
                <span className="text-2xl font-semibold">
                    LKR. {getCartTotal().toFixed(2)}
                </span>
            </div>
        </div>
    );
}