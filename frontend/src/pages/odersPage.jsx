import { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../components/loader';
import ViewOrderInfoCustomer from '../components/viewOrderinfoCustomer';

const OrdersPage = () => {

  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + '/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [loaded]);

  return (
    <div className='w-full h-full flex flex-col items-center px-6 py-10 bg-primary text-secondary'>

      <div className="w-full h-full-6xl bg-white shadow-xl rounded-2xl overflow-hidden border border-neutral-200">
        
        <div className="p-5 bg-secondary">
          <h1 className="text-2xl font-semibold text-accent">All Orders</h1>
        </div>

        <div className="overflow-auto max-h-[75vh]">
          {loaded ? (
            <table className="w-full border-collapse">
              <thead className="bg-accent text-secondary sticky top-0 shadow">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer Email</th>
                  <th className="p-4 text-left">Customer Name</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Total Amount</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-primary transition border-b border-neutral-200"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                        {order.orderId}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                        {order.email}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                        {order.name}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                        {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                        {order.status}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                        LKR. {order.total?.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                        <ViewOrderInfoCustomer order = {order}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Loader/>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;
