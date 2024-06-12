import React from "react";
import LoginImg from "../img/LoginImg.png";
import RegisterImg from "../img/RegisterImg.png";
import icon from "../img/icon.png";
import dollarIcon from "../img/dollarIcon.png";
import userIcon from "../img/userIcon.png";
import cvvIcon from "../img/cvvIcon.png";
import dateIcon from "../img/dateIcon.png";
import { useEffect } from "react";

const UserPayment = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Payment";
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen md:p-8">
      <div className="flex-col md:flex-row max-w-4xl mx-auto bg-white shadow-md rounded-md p-4 flex md:space-x-8">
        {/* Bagian Kiri: Checkout Form */}
        <div className="md:flex-1 mt-0 md:space-y-8">
          <h1 className="text-4xl font-bold mt-0 text-[#322C2B]">Checkout</h1>

          <div className="p-2 block border-2 border-[#AF8260] rounded">
            <div className="flex justify-between p-2 tracking-tight">
              <span className="font-semibold text-gray-400 text-md">
                Contact
              </span>
              <span className="font-medium text-md">Taylor Swift</span>
              <button className="font-semibold text-[#AF8260] hover:text-[#322C2B]">
                Edit
              </button>
            </div>
            <div className="flex border-b border-[#AF8260]"></div>
            <div className="flex justify-between p-2 tracking-tight">
              <span className="font-semibold text-gray-400 text-md">
                Ship to
              </span>
              <span className="font-medium text-md text-[#322C2B]">
                Via Firenze 23, 92023, Italia
              </span>
              <button className="font-semibold text-[#AF8260] hover:text-[#322C2B]">
                Edit
              </button>
            </div>
          </div>

          <div className="py-2 justify-start">
            <select className="select bg-[#AF8260] w-full py-2 rounded-md text-white font-medium max-w-xs text-base focus:outline-none">
              <option disabled selected>
                Choose Your Shipping
              </option>
              <option>JNE Reguler</option>
              <option>POS Indonesia</option>
              <option>Si Cepat Express</option>
            </select>
          </div>

          <div className="mb-2 space-y-4">
            <h2 className="text-xl font-bold mb-0 text-[#322C2B]">
              Payment Methods
            </h2>
            <div className="flex gap-8 mb-4">
              <div>
                <button className="w-full outline outline-2 px-4 py-2 h-14 rounded text-center outline-[#AF8260] hover:bg-[#322C2B] hover:text-white hover:outline-none focus:outline-none focus:bg-[#322C2B] focus:text-white flex items-center justify-center text-sm font-semibold">
                  <img src={icon} alt="MasterCard" className="h-[20px] me-2" />
                  <span className="tracking-tight">CREDIT CARD</span>
                </button>
              </div>
              <div>
                <button className="w-full outline outline-2 px-4 py-2 h-14 rounded text-center outline-[#AF8260] hover:bg-[#322C2B] hover:text-white hover:outline-none focus:outline-none focus:bg-[#322C2B] focus:text-white flex items-center justify-center text-sm font-semibold">
                  <img
                    src={dollarIcon}
                    alt="MasterCard"
                    className="h-[20px] me-2"
                  />
                  <span className="tracking-tight">OTHER PAYMENT</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <div className="absolute top-2 right-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="MasterCard"
                    className="h-6"
                  />
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Holder Name"
                  className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <div className="absolute top-2 right-3">
                  <img src={userIcon} alt="User Icon" className="h-6" />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="relative w-1/2">
                  <input
                    type="date"
                    placeholder="Expiration (MM/YY)"
                    className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img src={dateIcon} alt="Date Icon" className="h-6" />
                  </div>
                </div>

                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="CVV"
                    className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img src={cvvIcon} alt="CVV Icon" className="h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <a
              href="#"
              className="text-[#AF8260] hover:text-[#322C2B] hover:underline focus:underline focus:text-[#322C2B]"
            >
              <span className="text-lg font-normal">Back to Cart</span>
            </a>
            <button className="bg-[#322C2B] text-white py-2 px-6 rounded focus:bg-[#322C2B] hover:bg-[#4d4746] focus:text-white">
              <span className="text-lg font-semibold">Pay Now</span>
            </button>
          </div>
        </div>

        {/* Bagian Kanan: Order Details */}
        <div className="sm:max-w-xs w-full sm:pt-16">
          <div className="bg-[#AF8260] shadow-md rounded-md p-4 sm:space-y-6 ">
            <h2 className="text-xl font-bold text-white">Order Details</h2>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={LoginImg}
                  alt="Puma T-Shirt"
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <p className="font-medium text-[#322C2B]">Puma T-Shirt</p>
                  <p className="text-sm text-white">Size M</p>
                </div>
              </div>
              <p className="font-medium text-white">Rp 40.000</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={RegisterImg}
                  alt="Puma T-Shirt"
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <p className="font-medium text-[#322C2B]">Puma T-Shirt</p>
                  <p className="text-sm text-white">Size M</p>
                </div>
              </div>
              <p className="font-medium text-white">Rp 40.000</p>
            </div>

            <div className="border-t pt-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="input h-8 text-sm focus:ring-2 focus:ring-[#322C2B] focus:outline-none focus:border-none rounded-none w-full py-1 px-3 mb-4 "
                />
                <button className="min-w-20 ms-2 h-8 bg-[#322C2B] rounded focus:bg-[#322C2B] hover:bg-[#4d4746] focus:text-white">
                  <span className="text-white p-1 text-sm">Add code</span>
                </button>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <p className="font-semibold">Subtotal</p>
                <p className="text-md font-semibold">Rp 80.000</p>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <p className="font-semibold">Shipping</p>
                <p className="text-md font-semibold">Rp 8.000</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-[#322C2B] font-bold">Total</p>
                <p className="text-md font-bold text-[#322C2B]">Rp 88.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;