import { useState } from "react";
import { BiSolidChevronUp } from "react-icons/bi";
import { getCart, addToCart } from "../utils/cart"; 
import { Link } from "react-router-dom";
import { getCartTotal } from "../utils/cart";


export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    
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
                cart.map((item , index) => (
                    <div key={index} className="w-full lg:w-[50%] lg:h-[175px] pt-[20px] relative rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
                        <h1 className="lg:hidden w-full overflow-hidden h-[20px] absolute top-[0px]">{item.name}</h1>
                        
                        <div className="h-full flex flex-col">
                        <img src={item.image} 
                        className="h-[80px] lg:h-full aspect-square object-cover"/>
                           <div className=" lg:hidden mt-2">
                                {item.labelledPrice && item.labelledPrice > item.price && (
                                    <h2 className="text-secondary/80 line-through decoration-red-700 decoration-2 mr-2">
                                        LKR. {item.labelledPrice.toFixed(2)}
                                    </h2>
                                )}
                                <h2 className="text-xl text-black font-semibold">
                                    LKR. {item.price.toFixed(2)}
                                </h2>
                            </div>
                            
                        </div>
                        
                        <div className="hidden lg:flex flex-col justify-center pl-4 flex-1">
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
                            
                            <div className="items-center mt-2">
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
                       
                       <div className="min-h-full flex flex-row items-center gap-4">
                            <div className="h-full flex flex-col justify-center items-center">
                                <BiSolidChevronUp 
                                    onClick={() => handleQuantityChange(item, 1)}
                                    className="text-3xl cursor-pointer hover:text-secondary/80 transition"
                                />
                                <span className="text-lg">{item.quantity}</span>
                                <BiSolidChevronUp 
                                    onClick={() => handleQuantityChange(item, -1)}
                                    className="rotate-180 text-3xl cursor-pointer hover:text-secondary/80 transition"
                                />
                            </div>
                            <div className="flex items-center pr-4">
                                <span className="pr-4 text-lg font-semibold w-[150px] text-right">
                                    LKR. {(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className="w-full lg:w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between item-center">
                <Link
                    to="/checkout"
                    className="self-center ml-4 px-6 py-3 bg-secondary text-white rounded hover:bg-secondary/80 transition"
                        state={
                            cart
                        }
                    >
                        checkout
                </Link>
                <span className="pr-4 text-2xl font-semibold flex items-center">
                    LKR. {getCartTotal().toFixed(2)}
                </span>

            </div>
        </div>
    );
}