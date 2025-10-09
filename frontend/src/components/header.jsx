import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-secondary flex">
            <img src="/logo.png" className ="h-full" alt="logo" />
            <div className="w-full h-full flex text-white text-xl justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products" >Product</Link>
                <Link to="/about" >About</Link>
                <Link to="/contact" >Contact</Link>
            </div>
            

        </header>
    )
}