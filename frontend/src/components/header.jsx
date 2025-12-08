import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-secondary flex relative">
            <img src="/logo.png" className ="h-full" alt="logo" />
            <div className="w-full h-full flex text-white text-xl justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products" >Product</Link>
                <Link to="/about" >About</Link>
                <Link to="/contact" >Contact</Link>
            </div>
            <Link to="/cart" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl">
                🛒
                {/* <BiShoppingBag/> */}
            </Link>
            

        </header>
    )
}