import toast from "react-hot-toast"

export default function ViewOrderInfo(props){
    const order = props.order
    return 
    <>
    <button className="bg-secondary/70 hover:bg-secondary p-2 rounded-lg text-white cursor-pointer"
    onClick={
        ()=>{
            toast.success(order.orderId)
        }
    }>View Info</button>
    
    </>
}