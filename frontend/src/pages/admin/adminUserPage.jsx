import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import Loader from '../../components/loader';



const adminUserPage = () => {

  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + '/users/all',{
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    }
  }, [loaded]);


  return (
    <div className='w-full h-full flex flex-col items-center px-6 py-10 bg-primary text-secondary'>

      <div className="w-full h-full-6xl bg-white shadow-xl rounded-2xl overflow-hidden border border-neutral-200">
        
        <div className="p-5 bg-secondary">
          <h1 className="text-2xl font-semibold text-accent">Product Inventory</h1>
        </div>

        <div className="overflow-auto max-h-[75vh]">
          {loaded ? <table className="w-full border-collapse">
            <thead className="bg-accent text-secondary sticky top-0 shadow">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">First Name</th>
                <th className="p-4 text-left">Last Name</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">status</th>
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
                        src={item.image}
                        className="w-[40px] h-[40px] rounded-md shadow-sm object-cover"
                      />
                    </td>
                    <td className="p-4">{item.image}</td>
                    <td className="p-4 font-medium text-MainText">{item.firstName}</td>
                    <td className="p-4">Rs {item.lastName}</td>
                    <td className="p-4">Rs {item.role}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>:<Loader/>
          // <div className="w-full h-screen fixed top-0 left-0 bg-black/45 flex justify-center items-center">
          //          <div className="w-[100px] h-[100px] border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          //     </div>  <-- Loader Component replaced this block -->
            }
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

export default adminUserPage;


