import Loader from "../components/loader";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { FaSearch } from "react-icons/fa";

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // LOAD ALL PRODUCTS
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products")
            .then((res) => {
                setProducts(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    // SEARCH HANDLER
    const handleSearch = async (value) => {
        try {
            if (value === "") {
                const res = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/products"
                );
                setProducts(res.data);
            } else {
                const res = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/products/search/" + value
                );
                setProducts(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">

            {/* HERO SECTION */}
            <div className="relative w-full h-120">
                <img
                    src="/products.jpg"
                    alt="Product Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold mb-2">Explore Our Products</h1>
                    <p className="text-lg opacity-90">
                        Quality products at the best prices
                    </p>
                </div>
            </div>

            {!loaded ? <Loader /> : (
                <div className="max-w-7xl mx-auto px-4 py-10">

                    {/* SEARCH BAR */}
                    <div className="sticky top-0 z-20 bg-gray-50 py-4 mb-8">
                        <div className="relative max-w-xl mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products by name..."
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none shadow-sm"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* PRODUCT LIST */}
                    {products.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            <p className="text-lg font-medium">No products found 😔</p>
                            <p className="text-sm mt-2">
                                Try searching with a different keyword
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map((item) => (
                                <ProductCard
                                    key={item._id}
                                    product={item}
                                />
                            ))}
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
