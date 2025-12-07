import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiOutlineProduct } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFile  from '../../utils/mediaUpload.js';

const AdminUpdateProductPage = () => {
    const location = useLocation();
    const [productID, setProductID] = useState(location.state.productID);  
    const [name, setName] = useState(location.state.name);
    const [altName, setAltName] = useState(location.state.altNames.join(", "));
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price);
    const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState(location.state.category);
    const [brand, setBrand] = useState(location.state.brand);
    const [model, setModel] = useState(location.state.model);
    const [stock, setStock] = useState(location.state.stock);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

      if (!location.state) {
        window.location.href = "/admin/products";
    }


    async function UpdateProduct() {
        const token = localStorage.getItem("token");
        
        if (token == null) {
            toast.error("You are not authorized to add products");
            navigate("/login");
            return;
        } 
        

        if (!files || files.length === 0) {
            toast.error("No files selected");
            return;
        }

        const imagePromises =[];

        for(let i=0; i<files.length; i++){
             const Promise = uploadFile(files[i]); //pinture upload krla upload krala url ekk dennm kiyla promise ekak denwa.
            imagePromises.push(Promise);//me code eka run wela iwra weddi imagePromises array eka atule promise godak tiynw.
        }
        let images = await Promise.all(imagePromises).catch((error)=>{ //mehemai meka use krnne me array eke thyna promise tika iwra wela complete wela thyna url tika ganna.
            toast.error("Error uploading images");
            console.log("Error uploading images:");
            console.log(error);
            return;
        });
        if(images.length == 0){
            images = location.state.images;
        }
       

        // Validation
        if (!productID || !name || !description || !price || !category || !brand || !model || stock === "") {
            toast.error("Please fill all the required fields");
            return;
        }

        setLoading(true);

        try {
            const altNamesInArray = altName ? altName.split(",").map(item => item.trim()) : [];
           
            const productData = {
                name: name,
                altName: altNamesInArray,
                description: description,
                price: Number(price),
                labelledPrice:labelledPrice,
                images: images,
                category: category,
                brand: brand,
                model: model,
                stock: Number(stock),
                isAvailable: isAvailable
            };

            console.log("Sending product data:", productData);

            const response = await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/products/" + productID,
                productData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        
                    }
                }
            );

            console.log("Product updated successfully:", response.data);
            toast.success("Product updated successfully");
            navigate("/admin/products");
            

        } catch (error) {
             toast.error("Error update product");
            console.log("Error update product:");
            console.log(error);
        }  finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll'>
            <div className=' bg-MainText/50 rounded-2xl p-[40px] w-[800px] shadow-2xl overflow-y-visible'>
                <h1 className='w-full text-3xl font-bold mb-[20px] flex items-center gap-[5px]'> 
                    <AiOutlineProduct /> Update Product
                </h1>
                <div className='w-full bg-accent p-[20px] text-2xl flex flex-row flex-wrap justify-between rounded-xl'>
                   
                    <div className='my-[20px] w-[40%]'>
                        <label>Product ID *</label>
                        <input 
                            disabled={true} // Product ID eka update krnnd be.
                            type="text" 
                            value={productID} 
                            onChange={(e) => setProductID(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                        <p className='text-sm text-gray-500 w-full text-right'>Provide a unique Product Id</p>
                    </div>

                    <div className='my-[20px] w-[40%]'>
                        <label>Name *</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                    </div>

                    <div className='my-[20px] w-full'>
                        <label>Alternative Names</label>
                        <input 
                            type="text" 
                            value={altName} 
                            onChange={(e) => setAltName(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                        <p className='text-sm text-gray-500 w-full text-right'>Separate multiple names with commas</p>
                    </div>

                    <div className='my-[20px] w-full'>
                        <label>Description *</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className='w-full h-[100px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px] py-[10px] text-2xl'
                        />
                    </div>

                    <div className='my-[20px] w-[40%]'>
                        <label>Price *</label>
                        <input 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                    </div>

                    <div className='my-[20px] w-[40%]'>
                        <label>Labelled Price</label>
                        <input 
                            type="number" 
                            value={labelledPrice} 
                            onChange={(e) => setLabelledPrice(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                    </div>

                    <div className='my-[20px] w-full'>
                        <label>Images</label>
                        <input 
                            type="file" 
                            multiple = {true} // Allow multiple file selection "file kamathi gank upload krnn puluwn"
                            onChange={(e) => {
                                setFiles(e.target.files);
                            }} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                        <p className='text-sm text-gray-500 w-full text-right'>Separate image URLs with commas</p>
                    </div>

                    <div className='my-[10px] flex flex-col w-[30%]'>
                        <label>Category *</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        >
                            <option value="">Select Category</option>
                            <option value="cpu">CPU</option>
                            <option value="gpu">GPU</option>
                            <option value="motherboard">Motherboard</option>
                            <option value="ram">RAM</option>
                            <option value="storage">Storage</option>
                            <option value="power supply">Power Supply</option>
                            <option value="cabinet">Cabinet</option>
                            <option value="cooling">Cooling</option>
                            <option value="monitors">Monitors</option>
                        </select>
                    </div>

                    <div className='my-[10px] w-[30%]'>
                        <label>Brand *</label>
                        <input 
                            type="text" 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                    </div>

                    <div className='my-[10px] w-[30%]'>
                        <label>Model *</label>
                        <input 
                            type="text" 
                            value={model} 
                            onChange={(e) => setModel(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                    </div>

                    <div className='my-[10px] w-[50%]'>
                        <label>Stock *</label>
                        <input 
                            type="number" 
                            value={stock} 
                            onChange={(e) => setStock(e.target.value)} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        />
                    </div>

                    <div className='my-[10px] flex flex-col item-center w-[40%]'>
                        <label>Availability</label>
                        <select 
                            value={isAvailable} 
                            onChange={(e) => setIsAvailable(e.target.value === "true")} 
                            className='w-full h-[50px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary border border-secondary shadow-2xl px-[20px]'
                        >
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </div>

                    <Link 
                        to="/admin/products" 
                        className="w-[49%] h-[60px] bg-red-500 text-white font-bold text-2xl rounded-2xl mt-[20px] hover:bg-black hover:text-accent border-2 border-accent flex justify-center items-center"
                    >
                        Cancel
                    </Link>
                    
                    <button 
                        onClick={UpdateProduct} 
                        disabled={loading}
                        className='w-[49%] h-[60px] bg-MainText text-white font-bold text-2xl rounded-2xl mt-[20px] hover:bg-black hover:text-accent border-2 border-accent flex justify-center items-center disabled:opacity-50'
                    >
                        {"Update Product"}
                    </button>
                </div> 
            </div>
        </div>
    )
}

export default AdminUpdateProductPage;