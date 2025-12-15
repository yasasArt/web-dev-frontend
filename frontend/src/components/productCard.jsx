import { Link } from "react-router-dom";

export default function ProductCard(props){ //mul akura aniwryen capital wiya yuthui

    const product = props.product;

    return(
        <Link to={"/overview/" + product.productID} className="w-[300px] h-[400px] shadow-2xl m-4 cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0">
         <div className="w-full h-[250px] bg-red-900 relative">
            <img
                src={product.images[1]}
                className="w-full h-full absolute bg-white object cover"/>
            <img
                src={product.images[0]}
                className="w-full h-full absolute bg-white primary-image transition-opacity duration-300 object-cover"/>
         </div>
         
          <div className="w-full h-[150px] p-2 flex flex-col justify-between" //"justify-between dunnham uparima athin innwa.
          > 
            <h1 className="text-center text-lg">{product.name}</h1>
            <div className="w-full flex flex-col justify-center items-center">
                {
                    product.labelledPrice > product.price &&
                    <h2 className="text-secondary/80 line-through decoration-red-700 decoration-2 mr-2">
                        LKR. {product.labelledPrice.toFixed(2)}
                    </h2>
                }
                <h2 className="text-black font-semibold text-2xl">
                    LKR.{product.price.toFixed(2)}
                </h2>

            </div>
          </div>
          <div className="w-full h-[150px] bottom-0 opacity-0 absolute buttons bg-white flex flex-row gap-4 justify-center items-center transition-opacity duration-300 ">
            <button  className="border-2 border-secondary text-secondary hover:bg-MainText hover:text-white transition-colors duration-150 h-[50px] w-[150px] flex justify-center items-center">View Details</button>
          </div>
            
        </Link>
    )
}