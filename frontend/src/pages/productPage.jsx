import Loader from "../components/loader";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";

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
                    import.meta.env.VITE_BACKEND_URL +
                    "/products/search/" + value
                );
                setProducts(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full h-[calc(100vh-100px)]">

            {!loaded ? <Loader /> : (
                <div className="w-full flex justify-center p-4 flex-row flex-wrap pt-[100px]">

                    {/* SEARCH BAR */}
                    <div className="w-full h-[100px] sticky top-0 bg-white flex justify-center items-center mb-4 shadow-md z-10">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-1/2 px-4 py-2 border border-secondary rounded-lg outline-none"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    {/* PRODUCT LIST */}
                    {products.length === 0 ? (
                        <p className="text-gray-500">No products found</p>
                    ) : (
                        products.map((item) => (
                            <ProductCard
                                key={item._id}
                                product={item}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
