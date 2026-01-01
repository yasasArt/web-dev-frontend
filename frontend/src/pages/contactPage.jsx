import React, { useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const ContactPage = () => {

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: ""
});

const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");

// handle input change
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

// handle submit
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/contact/send`,
      formData
    );

    toast.success(res.data.message || "Message sent successfully 🚀");

    setFormData({ name: "", email: "", message: "" });

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message || "Failed to send message ❌"
    );

  } finally {
    setLoading(false);
  }
};



  return (
    <div className="w-full bg-primary text-secondary">

      {/* HERO BANNER */}
      <section className="relative w-full h-[50vh] flex items-center">
        <img
          src="/contact.png"
          alt="Contact NextCore"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/75"></div>

        <div className="relative z-10 px-6 md:px-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Contact <span className="text-MainText">NextCore</span>
          </h1>
          <p className="max-w-xl text-gray-300">
            Have questions? We’re here to help you build the perfect setup.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">

        {/* CONTACT INFO */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

          <p className="text-gray-600 mb-8">
            Reach out to us for product inquiries, custom PC builds,
            or technical support. Our team is always ready to assist you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-MainText text-xl" />
              <span>+94 77 123 4567</span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-MainText text-xl" />
              <span>support@nextcore.lk</span>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-MainText text-xl" />
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">
            Send Us a Message
          </h3>

          {/* SUCCESS / ERROR */}
          {success && (
            <p className="mb-4 text-green-600 font-medium">{success}</p>
          )}
          {error && (
            <p className="mb-4 text-red-600 font-medium">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-MainText"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-MainText"
            />

            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-MainText"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-MainText text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </section>

      {/* MAP */}
      <section className="w-full h-[400px]">
        <iframe
          title="NextCore Location"
          src="https://maps.google.com/maps?q=colombo%20sri%20lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
};

export default ContactPage;
