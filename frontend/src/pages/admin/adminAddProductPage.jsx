import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineProduct } from "react-icons/ai";


const AdminAddProductPage = () => {

    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altName, setAltName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [labelledPrice, setLabelledPrice] = useState(0);
    const [images, setImages] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [stock, setStock] = useState(0);
    const [isAvailabel, setisAvailable] = useState(false) ;
    const navigate = useNavigate();

    async function addProduct() {
    }

  return (
    <div className='w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll'>
        <div className=' bg-MainText/50 rounded-2xl p-[40px] w-[800px] shadow-2xl overflow-y-visible'>
            <h1 className='w-full text-3xl font-bold mb-[20px] flex items-center gap-[5px]' > <AiOutlineProduct />Add New Product</h1>
            <div className='w-full bg-accent p-[20px] text-2xl flex flex-row flex-wrap justify-between rounded-xl'>
               

                <div className='my-[20px] w-[40%]'>
                    <label>Product ID</label>
                    <input type="text" value={productID} onChange={(e) => setProductID(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                     <p className='text-sm text-gray-500 w-full text-right'>Provide a unique Product Id</p>
                </div>
                <div className='my-[20px] w-[40%]'>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[20px]'>
                    <label>Alternative Names</label>
                    <input type="text" value={altName} onChange={(e) => setAltName(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                    <p className='text-sm text-gray-500 w-full text-right'>Separate multiple names with commas</p>
                </div>
                <div className='my-[20px] w-full'>
                    <label>Discription</label>
                    <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='w-full h-[100px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px] py-[10px] text-2xl'/>
                </div>
                <div className='my-[20px] w-[40%]'>
                    <label>price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[20px] w-[40%]'>
                    <label>labelled Price</label>
                    <input type="text" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[20px] w-full'>
                    <label>Images</label>
                    <input type="text" value={images} onChange={(e) => setImages(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px] flex flex-col w-[30%]'>
                    <label>Category</label>
                    <select value ={category} onChange={(e) => setCategory(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'>
                        <option value="cpu">Cpu</option>
                        <option value="Gpu">Gpu</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="Ram">Ram</option>
                        <option value="Storage">Storage</option>
                        <option value="Power Supply">Power Supply</option>
                        <option value="Cabinet">Cabinet</option>
                        <option value="Cooling">Cooling</option>
                        <option value="Monitors">Monitors</option>
                    </select>

                </div>
                <div className='my-[10px] w-[30%]'>
                    <label>Band</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px] w-[30%]'>
                    <label>Model</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px] w-[50%]'>
                    <label>Stock</label>
                    <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px] flex flex-col  item-center  w-[40%]'>
                    <label>Availability</label>
                    <select value={isAvailabel} onChange={(e) => setisAvailable(e.target.value)} className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'>
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                </div>
                <Link to = "/admin/products" className="w-[49%] h-[60px] bg-red-500 text-white font-bold text-2xl rounded-2xl mt-[20px] hover:bg-black hover:text-accent border-2 border-accent flex justify-center items-center">
                  Cancel
                </Link>
                <button className='w-[49%]  h-[60px] bg-MainText text-white font-bold text-2xl rounded-2xl mt-[20px] hover:bg-black hover:text-accent border-2 border-accent flex justify-center items-center'>
                    Add Product
                </button>
            </div> 
       
        </div>
    </div>
  )
}

export default AdminAddProductPage