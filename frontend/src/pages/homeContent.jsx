import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaDesktop, FaKeyboard, FaHeadphones } from "react-icons/fa";

const HomeContent = () => {
  return (
    <div className="w-full bg-primary text-secondary">

      {/* HERO BANNER SECTION */}
            <section className="relative w-full min-h-[85vh]">

            {/* BACKGROUND IMAGE */}
            <img
                src="/homePageBanner.png"
                alt="NextCore Computer Shop"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-secondary/70"></div>

            {/* CONTENT */}
            <div className="relative z-10 w-full min-h-[85vh] flex flex-col justify-center px-6 md:px-16 text-white  ">
                <h1 className="text-4xl md:text-6xl font-bold mb-5 max-w-3xl">
                Power Your Setup with{" "}
                <span className="text-MainText">NextCore</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8  ">
                Premium computers, gaming gear, and accessories built for performance
                and reliability.
                </p>

                <div className="flex flex-wrap gap-4  ">
                <Link
                    to="/products"
                    className="bg-MainText px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition "
                >
                    Shop Now
                </Link>

                <Link
                    to="/about"
                    className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-secondary transition"
                >
                    Learn More
                </Link>
                </div>
            </div>

            </section>

      {/* CATEGORIES */}
      <section className="w-full bg-accent py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: <FaLaptop />, label: "Laptops" },
            { icon: <FaDesktop />, label: "Desktops" },
            { icon: <FaKeyboard />, label: "Accessories" },
            { icon: <FaHeadphones />, label: "Gaming Gear" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center transition"
            >
              <div className="text-4xl text-MainText mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold">{item.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="w-full py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose NextCore?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2 text-MainText">
              Trusted Quality
            </h3>
            <p className="text-gray-600">
              We sell only genuine and high-quality computer hardware.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2 text-MainText">
              Best Prices
            </h3>
            <p className="text-gray-600">
              Competitive pricing with exclusive deals for customers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2 text-MainText">
              Fast Support
            </h3>
            <p className="text-gray-600">
              Friendly and fast customer support whenever you need help.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full bg-secondary text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Build Your Dream PC Today
        </h2>
        <p className="text-gray-300 mb-6">
          Explore our latest products and start upgrading now.
        </p>

        <Link
          to="/products"
          className="bg-MainText px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Browse Products
        </Link>
      </section>

    </div>
  );
};

export default HomeContent;
