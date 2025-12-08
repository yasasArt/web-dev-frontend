import { useState } from "react";
import { getCart } from "../utils/cart";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    return (
        <div className="w-full flex flex-col items-center p-[20px]">
            {
                cart.map(
                    (item)=>{
                        return (
                            <div className="w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1">
                                <img src={item.image} className ="h-full aspect-square object-cover"/>
                                </div>
                        )
                    }
                )
            }

        </div>
    )

}