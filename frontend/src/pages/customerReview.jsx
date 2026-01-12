import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const CustomerReview = () => {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch reviews by product ID
  const fetchReviews = async () => {
    if (!productID) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${BACKEND_URL}/reviews/product/${productID}`
      );
      setReviews(res.data);
    } catch (err) {
      setMessage("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Submit review
  const submitReview = async (e) => {
    e.preventDefault();

    if (!productID || !name || !rating || !comment) {
      setMessage("All fields are required");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/reviews`, {
        name,
        productID,
        rating,
        comment,
      });

      setMessage("Review submitted! Waiting for approval.");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Customer Reviews
      </h1>

      {/* Product ID */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Product ID (e.g. PRD001)"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
          onBlur={fetchReviews}
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Review Form */}
      <form
        onSubmit={submitReview}
        className="bg-white shadow-lg rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {/* Star Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <FaStar
                key={i}
                size={28}
                className="cursor-pointer transition"
                color={
                  starValue <= (hover || rating) ? "#facc15" : "#e5e7eb"
                }
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        <textarea
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {message && (
          <p className="text-sm text-blue-600 mb-3">{message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Approved Reviews</h2>

        {loading && <p>Loading reviews...</p>}

        {!loading && reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{review.name}</h3>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} color="#facc15" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
