import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
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
          <h2 className="text-3xl font-bold mb-6">
            Get in Touch
          </h2>

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

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-MainText"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-MainText"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-MainText"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-MainText text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </section>

      {/* MAP (OPTIONAL) */}
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
