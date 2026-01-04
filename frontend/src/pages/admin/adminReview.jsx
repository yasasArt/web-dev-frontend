import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaCheck, FaTimes } from "react-icons/fa";

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/reviews/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(res.data);
    } catch (error) {
      console.error("Error loading reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/reviews/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReviews();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin – Customer Reviews</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t">
                <td className="px-4 py-3">{review.user?.name}</td>
                <td className="px-4 py-3">{review.product?.name}</td>
                <td className="px-4 py-3 flex gap-1">
                  {renderStars(review.rating)}
                </td>
                <td className="px-4 py-3 max-w-xs truncate">
                  {review.comment}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        review.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : review.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {review.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        updateStatus(review._id, "approved")
                      }
                      className="bg-green-500 p-2 text-white rounded hover:bg-green-600"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(review._id, "rejected")
                      }
                      className="bg-red-500 p-2 text-white rounded hover:bg-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reviews.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No reviews available
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminReview;
