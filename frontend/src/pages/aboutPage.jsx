import React from "react";
import { FaCheckCircle, FaUsers, FaShippingFast, FaTools } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="w-full bg-primary text-secondary">

      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] flex items-center">
        <img
          src="/homePageBanner.png"
          alt="About NextCore"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/75"></div>

        <div className="relative z-10 px-6 md:px-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            About <span className="text-MainText">NextCore</span>
          </h1>
          <p className="max-w-xl text-gray-300">
            Building powerful, reliable, and affordable computer solutions
            for everyone.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            NextCore is a modern computer shop dedicated to providing
            high-performance computers, accessories, and gaming gear.
            We focus on quality, reliability, and customer satisfaction.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're a gamer, student, professional, or business,
            we help you build the perfect setup that fits your needs and budget.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6">
            What Makes Us Different
          </h3>

          <ul className="space-y-4">
            {[
              "100% Genuine Products",
              "Expert Technical Support",
              "Affordable Pricing",
              "Fast Island-wide Delivery",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <FaCheckCircle className="text-MainText" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STATS / FEATURES */}
      <section className="bg-accent py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <FaUsers className="text-3xl text-MainText mx-auto mb-2" />
            <h3 className="text-xl font-bold">5K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FaTools className="text-3xl text-MainText mx-auto mb-2" />
            <h3 className="text-xl font-bold">Expert Builds</h3>
            <p className="text-gray-600">Custom PCs</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FaShippingFast className="text-3xl text-MainText mx-auto mb-2" />
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-gray-600">Across Sri Lanka</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FaCheckCircle className="text-3xl text-MainText mx-auto mb-2" />
            <h3 className="text-xl font-bold">Trusted</h3>
            <p className="text-gray-600">Quality Guaranteed</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-secondary text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Upgrade Your Setup?
        </h2>
        <p className="text-gray-300 mb-6">
          Browse our products or contact us for expert advice.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/products"
            className="bg-MainText px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Shop Now
          </a>
          <a
            href="/contact"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-secondary transition"
          >
            Contact Us
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
