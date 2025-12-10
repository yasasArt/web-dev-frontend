import { useState } from "react";
import { BiSolidChevronUp } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart, addToCart } from "../utils/cart"; 

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(getCart());

    if(location.state == null){
        navigate("/products");
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

    return (
        <div className="w-full flex flex-col items-center p-[20px]">
            {cart.length === 0 ? (
                <div className="text-center text-gray-500 text-xl mt-10">
                    Your cart is empty
                </div>
            ) : (
                cart.map((item, index) => (
                    <div key={item.productID} className="w-[50%] h-[175px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
                        <img src={item.image} alt={item.name} className="h-full aspect-square object-cover"/>
                        
                        <div className="flex flex-col justify-center pl-4 flex-1">
                            <h1 className="text-2xl font-semibold relative group">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity italic text-sm absolute -top-8 bg-gray-800 text-white px-3 py-1 rounded-full whitespace-nowrap z-10">
                                    {item.name}
                                </span>
                                {item.name.length > 20 ?
                                    item.name.substring(0, 20) + "..." :
                                    item.name
                                }
                            </h1>
                            
                            {/* Description - if you have it in item object */}
                            {item.description && (
                                <p className="text-gray-600 mt-1">
                                    {item.description.length > 50 ?
                                        item.description.substring(0, 50) + "..." :
                                        item.description
                                    }
                                </p>
                            )}
                            
                            <div className="flex items-center mt-2">
                                {item.labelledPrice && item.labelledPrice > item.price && (
                                    <h2 className="text-secondary/80 line-through decoration-red-700 decoration-2 mr-2">
                                        LKR. {item.labelledPrice.toFixed(2)}
                                    </h2>
                                )}
                                <h2 className="text-xl text-black font-semibold">
                                    LKR. {item.price.toFixed(2)}
                                </h2>
                            </div>
                            
                            <h3 className="text-lg mt-2">{item.productID}</h3>
                        </div>
                       
                       <div className="h-full flex flex-row items-center gap-4">
                            <div className="h-full flex flex-col justify-center items-center">
                                <BiSolidChevronUp 
                                    onClick={() => {
                                        handleQuantityChange(item, 1)
                                        const copiedCart =[...Cart]
                                        copiedCart[index].quantity += 1
                                        setCart(copiedCart)
                                    }
                                    }
                                    className="text-3xl cursor-pointer hover:text-secondary/80 transition"
                                />
                                <span className="text-lg">{item.quantity}</span>
                                <BiSolidChevronUp 
                                    onClick={() => {
                                        handleQuantityChange(item, -1)
                                        const copiedCart =[...cart]
                                        copiedCart[index].quantity -= 1
                                        if(copiedCart[index].quantity < 1){
                                            copiedCart.splice(index, 1)
                                        }
                                        setCart(copiedCart)
                                    }
                                }
                                    className="rotate-180 text-3xl cursor-pointer hover:text-secondary/80 transition"
                                />
                            </div>
                            <div className="flex items-center pr-4">
                                <span className="text-lg font-semibold">
                                    LKR. {(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                        
                    </div>
                ))
            )}
            <div className="w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between item-center">
                <button 
                    className="self-center ml-4 px-6 py-3 bg-secondary text-white rounded hover:bg-secondary/80 transition">
                    Order Now
                </button>
                <span className="pr-4 text-2xl font-semibold flex items-center">
                    {/* LKR. {getCartTotal().toFixed(2)} */}
                </span>

            </div>
        </div>
    );
}