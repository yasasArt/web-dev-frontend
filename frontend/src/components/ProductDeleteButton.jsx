import React from 'react'
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';

const ProductDeleteButton = (props) => {

    const productID = props.productID;
    const reload = props.reload;
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const token = localStorage.getItem('token');
        axios
            .delete(
                import.meta.env.VITE_BACKEND_URL + "/products/" + productID ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            .then(() => {
                toast.success("Product deleted successfully");
                setIsDeleting(false);
                setIsMessageOpen(false);
                reload();
            }).catch(() => {
                toast.error("Error deleting product");
                setIsDeleting(false);
         });
    }
  return (
    <>
    <button
         onClick={()=>{setIsMessageOpen(true)}}  
         className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
        Delete
    </button>
    {isMessageOpen&& <div className="w-screen h-screen fixed z-[9999] top-0 left-0 bg-black/35 flex justify-center items-center text-white text-xl font-bold">
        <div className="w-[600px] h-[300px] bg-primary rounded-2xl relative flex flex-col justify-center items-center p-10 shadow-lg border border-neutral-200">
            <button onClick={()=>{setIsMessageOpen(false)}} className="w-[40px] h-[40px] bg-red-600 rounded-full text-white text-xl font-bold cursor-pointer hover:bg-red-800 absolute right-[-32px] top-[-32px]" >
                X
            </button>
            <h1 className="text-secondary text-center text-2xl mb-8">Are you sure you want to delete this product {productID}?</h1>
            <div className="flex gap-8">
                <button 
                    disabled={isDeleting}
                    onClick={handleDelete}
                    className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition'>
                    Delete
                </button>
                <button onClick={()=>{setIsMessageOpen(false)}} className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 transition'>
                    Cancel
                </button>
            </div>
        </div>
    </div>}
    </>
  )
}

export default ProductDeleteButton

