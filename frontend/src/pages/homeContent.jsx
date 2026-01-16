import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaDesktop, FaKeyboard, FaHeadphones, FaShippingFast, FaShieldAlt, FaAward, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const HomeContent = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white text-gray-900">

      {/* HERO BANNER SECTION */}
      <section className="relative w-full min-h-[90vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src="/homePageBanner.png"
          alt="NextCore Computer Shop"
          className="absolute inset-0 w-full h-full object-cover transform scale-105 animate-[subtle-zoom_20s_ease-in-out_infinite]"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>

        {/* ANIMATED PARTICLES */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping animation-delay-2000"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 text-white">
          <div className="max-w-4xl animate-[fade-in-up_1s_ease-out]">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full">
              <span className="text-blue-300 text-sm font-medium">🚀 Premium Tech Hardware</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              Power Your Setup with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text animate-[gradient-shift_3s_ease-in-out_infinite]">
                NextCore
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
              Premium computers, gaming gear, and accessories built for peak performance
              and unmatched reliability.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Shop Now
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="px-8 py-4 rounded-xl border-2 border-white/30 backdrop-blur-sm font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl">
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "500+", label: "Products" },
                { number: "24/7", label: "Support" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center border-r border-white/20 last:border-r-0">
                  <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-lg">Explore our wide range of premium tech products</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "/laptop.jpg", label: "Laptops", id: "laptops", color: "from-blue-500 to-cyan-500" },
            { icon: "/Desktop.png", label: "Desktops", id: "desktops", color: "from-purple-500 to-pink-500" },
            { icon: "/accessories.jpg", label: "Accessories", id: "accessories", color: "from-green-500 to-teal-500" },
            { icon: "/Game-Gear.jpg", label: "Gaming Gear", id: "gaming", color: "from-orange-500 to-red-500" }
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/products/`)}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Animated background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Image */}
              <div className="relative z-10 mb-4 transform group-hover:scale-110 transition-transform duration-500">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-50 h-50 object-contain"
                />
              </div>

              <h3 className="relative z-10 font-bold text-lg text-gray-800 group-hover:text-gray-900">
                {item.label}
              </h3>

              {/* Hover underline */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
              ></div>
            </div>
          ))}
        </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="w-full py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text">
              Why Choose NextCore?
            </h2>
            <p className="text-gray-600 text-lg">Experience the NextCore difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaAward />,
                title: "Trusted Quality",
                description: "We sell only genuine and high-quality computer hardware backed by manufacturer warranties.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: <FaShieldAlt />,
                title: "Best Prices",
                description: "Competitive pricing with exclusive deals and price-match guarantees for our customers.",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: <FaShippingFast />,
                title: "Fast Support",
                description: "Friendly 24/7 customer support and lightning-fast shipping whenever you need help.",
                color: "from-blue-500 to-purple-500"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Animated gradient background */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                
                <div className={`text-5xl mb-4 bg-gradient-to-br ${feature.color} text-transparent bg-clip-text transform group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                
                <h3 className="font-black text-2xl mb-3 text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* VIEW ALL PRODUCTS */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-xl font-bold text-white text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="relative z-10 py-24 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
            Build Your Dream PC Today
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Explore our latest products and start upgrading your setup with premium components.
          </p>

          <Link
            to="/products"
            className="inline-block bg-white text-gray-900 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105"
          >
            Browse Products
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-white/80">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-2xl" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShippingFast className="text-2xl" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <FaAward className="text-2xl" />
              <span>Warranty Included</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes subtle-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

    </div>
  );
};

export default HomeContent;