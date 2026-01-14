import { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const CustomerReview = () => {
  const [name, setName] = useState("");
  const [productID, setProductID] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating ⭐");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`,
        { name, productID, rating, comment }
      );

      toast.success(res.data.message || "Review submitted!");

      // reset form
      setName("");
      setProductID("");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit review"
      );
      console.error("Review submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-1">
          Leave a Review ✍️
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Share your experience with this product
        </p>

        <form onSubmit={submitReview} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Your Name</label>
            <input
              type="text"
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Product ID</label>
            <input
              type="text"
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="PRD001"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium">Rating</label>
            <div className="flex gap-2 mt-2">
              {[...Array(5)].map((_, i) => {
                const value = i + 1;
                return (
                  <FaStar
                    key={value}
                    size={26}
                    className="cursor-pointer transition-transform hover:scale-110"
                    color={
                      value <= (hover || rating)
                        ? "#facc15"
                        : "#e5e7eb"
                    }
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Review</label>
            <textarea
              rows="4"
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerReview;
