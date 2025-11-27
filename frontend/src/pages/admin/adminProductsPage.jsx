import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";
import axios from "axios";

const AdminProductsPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + '/products')
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center px-6 py-10 bg-primary text-secondary'>

      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden border border-neutral-200">
        
        <div className="p-5 bg-secondary">
          <h1 className="text-2xl font-semibold text-accent">Product Inventory</h1>
        </div>

        <div className="overflow-auto max-h-[75vh]">
          <table className="w-full border-collapse">
            <thead className="bg-accent text-secondary sticky top-0 shadow">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Labelled Price</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Availability</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary transition border-b border-neutral-200"
                  >
                    <td className="p-4">
                      <img
                        src={item.images[0]}
                        className="w-[40px] h-[40px] rounded-md shadow-sm object-cover"
                      />
                    </td>
                    <td className="p-4">{item.productID}</td>
                    <td className="p-4 font-medium text-MainText">{item.name}</td>
                    <td className="p-4">Rs {item.price}</td>
                    <td className="p-4">Rs {item.labelledPrice}</td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4">{item.brand}</td>
                    <td className="p-4">{item.stock}</td>
                    <td
                      className={`p-4 font-semibold ${
                        item.isAvailable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.isAvailable ? "In Stock" : "Out of Stock"}
                    </td>
                    <td className='"p-4 text-left"'>
                      <div className='inline-flex items-center gap-2 '>
                      <button className='w-[100px] bg-red-400 flex justify-center items-center text-white p-2 rounded-lg cursor-pointer hover:bg-red-600'>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Floating Add Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-[30px] bottom-[30px] w-[60px] h-[60px] flex justify-center items-center text-5xl
        bg-secondary text-accent border-2 border-secondary rounded-full shadow-lg hover:bg-accent hover:text-secondary
        transition-all cursor-pointer"
      >
        <BiPlus />
      </Link>
    </div>
  );
};

export default AdminProductsPage;
