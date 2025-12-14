import { Link } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";

export default function Header() {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="w-full h-[80px] bg-secondary flex items-center px-4 relative">
                {/* Mobile Menu Icon */}
                <LuListCollapse
                    onClick={() => setSideBarOpen(true)}
                    className="text-white text-2xl cursor-pointer lg:hidden"
                />

                {/* Logo */}
                <img src="/logo.png" className="h-full ml-4" alt="logo" />

                {/* Desktop Menu */}
                <nav className="flex-1 hidden lg:flex justify-center gap-10 text-white text-lg">
                    <Link className="hover:text-gray-300" to="/">Home</Link>
                    <Link className="hover:text-gray-300" to="/products">Products</Link>
                    <Link className="hover:text-gray-300" to="/about">About</Link>
                    <Link className="hover:text-gray-300" to="/contact">Contact</Link>
                </nav>

                {/* Cart */}
                <Link
                    to="/cart"
                    className="absolute right-4 text-white text-2xl hover:scale-110 transition"
                >
                    🛒
                </Link>
            </header>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setSideBarOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-[260px] bg-white z-50
                transform transition-transform duration-300
                ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Sidebar Header */}
                <div className="h-[80px] bg-secondary flex items-center px-4">
                    <img src="/logo.png" className="h-full" alt="logo" />
                    <LuListCollapse
                        onClick={() => setSideBarOpen(false)}
                        className="text-white text-2xl ml-auto cursor-pointer rotate-180"
                    />
                </div>

                {/* Sidebar Links */}
                <nav className="flex flex-col p-6 gap-4 text-secondary text-lg">
                    <Link
                        to="/"
                        onClick={() => setSideBarOpen(false)}
                        className="hover:text-MainText"
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        onClick={() => setSideBarOpen(false)}
                        className="hover:text-MainText"
                    >
                        Products
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setSideBarOpen(false)}
                        className="hover:text-MainText"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setSideBarOpen(false)}
                        className="hover:text-MainText"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/cart"
                        onClick={() => setSideBarOpen(false)}
                        className="mt-4 font-semibold"
                    >
                        🛒 View Cart
                    </Link>
                </nav>
            </aside>
        </>
    );
}
