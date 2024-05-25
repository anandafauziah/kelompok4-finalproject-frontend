import React from "react";
import LoginImg from "../img/LoginImg.png";
import RegisterImg from "../img/RegisterImg.png";
import icon from "../img/icon.png";
import dollarIcon from "../img/dollarIcon.png";
import userIcon from "../img/userIcon.png";
import cvvIcon from "../img/cvvIcon.png";
import dateIcon from "../img/dateIcon.png";

const payment = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6 flex space-x-6">
        {/* Bagian Kiri: Checkout Form */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-[#322C2B]">Checkout</h1>

          <div className="mb-4 border border-[#AF8260] rounded p-2">
            <div className="flex justify-between items-center border-b border-[#AF8260] pb-2">
              <span className="font-medium text-gray-400  ">Contact</span>
              <span className="text-[#27272]">Taylor Swift</span>
              <button className="text-[#AF8260]">Edit</button>
            </div>
            <div className="flex justify-between items-center border-b border-[#AF8260] pb-2 mt-4">
              <span className="font-medium text-gray-400  ">Ship to</span>
              <span className="text-[#27272]">
                Via Firenze 23, 92023, Campobello di Licata AG, Italia
              </span>
              <button className="text-[#AF8260]">Edit</button>
            </div>
          </div>

          <div className="mb-4 justify-center">
            <select className="py-2 rounded-md w-full max-w-xs bg-[#AF8260] text-white font-medium">
              <option disabled selected>
                Choose your shipping
              </option>
              <option>JNE</option>
              <option>JNT</option>
              <option>SiCepat Regular</option>
            </select>
          </div>

          <div className="mb-4">
            <h2 className="font-medium mb-2 text-[#322C2B]">Payment Methods</h2>
            <div className="flex space-x-4 mb-4">
              <div>
                <button className="w-full border px-8 py-2 rounded text-center border-2 border-[#AF8260] hover:bg-[#AF8260] focus:outline-none focus:bg-[#AF8260] flex items-center justify-center">
                  <img src={icon} alt="MasterCard" className="h-[20px] me-2" />
                  <span>CREDIT CARD</span>
                </button>
              </div>
              <div>
                <button className="w-full border px-8 py-2 rounded text-center border-2 border-[#AF8260] hover:bg-[#AF8260] focus:outline-none focus:bg-[#AF8260] flex items-center justify-center">
                  <img
                    src={dollarIcon}
                    alt="MasterCard"
                    className="h-[20px] me-2"
                  />
                  <span>OTHER PAYMENT</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border py-2 px-3 rounded"
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
                  className="w-full border py-2 px-3 rounded"
                />
                <div className="absolute top-2 right-3">
                  <img src={userIcon} alt="User Icon" className="h-6" />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="Expiration (MM/YY)"
                    className="w-full border py-2 px-3 rounded"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img src={dateIcon} alt="Date Icon" className="h-6" />
                  </div>
                </div>

                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full border py-2 px-3 rounded"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img src={cvvIcon} alt="CVV Icon" className="h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <a href="#" className="text-[#AF8260]">
              Back to Cart
            </a>
            <button className="bg-[#322C2B] text-white py-2 px-6 rounded">
              Pay Now
            </button>
          </div>
        </div>

        {/* Bagian Kanan: Order Details */}
        <div className="max-w-xs">
          <div className="bg-[#AF8260] shadow-md rounded-md p-4">
            <h2 className="text-xl text-white font-medium mb-4">
              Order Details
            </h2>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={LoginImg}
                  alt="Puma T-Shirt"
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <p className="font-medium text-[#322C2B]">Puma T-Shirt</p>
                  <p className="text-sm text-white">Size M</p>
                </div>
              </div>
              <p className="font-medium text-white">Rp 40.000</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={RegisterImg}
                  alt="Puma T-Shirt"
                  className="w-12 h-12 mr-4"
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
                  placeholder="Coupon code"
                  className="w-full border py-2 px-3 rounded mb-4 h-10"
                />
                <button className="w-3/4 h-10 ms-2 bg-[#322C2B] text-white rounded">
                  Add code
                </button>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <p className="">Subtotal</p>
                <p className="font-medium ">Rp 80.000</p>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <p className="">Shipping</p>
                <p className="font-medium ">Rp 8.000</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-[#322C2B]">Total</p>
                <p className="font-medium text-[#322C2B]">Rp 88.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default payment;
