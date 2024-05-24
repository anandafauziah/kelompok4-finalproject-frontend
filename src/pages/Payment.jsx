import React from "react";
import LoginImg from "../img/LoginImg.png";

const Payment = () => {
  return (
    <div className="grid grid-cols-12 space-y-6 py-4">
      <div className="col-start-2 col-span-2 pt-2">
        <span className="font-bold text-lg text-yellow-950">Checkout</span>
      </div>

      <div className="inline-block static col-start-2 col-end-6...">
        <div className="inline-block rounded-md border-solid border-2 border-second">
          <ul role="list" className="p-4 divide-y divide-second">
            <li class="flex py-4 first:pt-0 last:pb-0">
              <div class="flex space-x-12 overflow-hidden">
                <p class="text-sm font-medium text-slate-400">Contact</p>
                <p class="text-sm text-slate-900 truncate">Taylor Swift</p>
                <p class="text-sm text-slate-900 truncate">Edit</p>
              </div>
            </li>
            <li class="flex py-4 first:pt-0 last:pb-0">
              <div class="flex space-x-12 overflow-hidden">
                <p class="text-sm font-medium text-slate-400">Address</p>
                <p class="text-sm text-slate-900 truncate">Vienna, italia</p>
                <p class="text-sm text-slate-900 truncate">Edit</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-start-8 col-span-4">
        <div className="space-y-6 px-4 rounded-md border-solid border-2 bg-second border-second">
          <span className="items-center font-bold text-lg text-white">Order Details</span>
          <ul role="list gap-2">
            <li class="group/item flex space-x-2">
              <img src={LoginImg} alt="" className="w-[100px] h-[100px]" />
              <div>
                <p>adidas t-shirt</p>
                <p>size M</p>
              </div>
              <div>
                <p>1x</p>
              </div>
              <div>
                <p>Rp 40.000</p>
              </div>
            </li>
            <li class="group/item flex space-x-2">
              <img src={LoginImg} alt="" className="w-[100px] h-[100px]" />
              <div>
                <p>adidas t-shirt</p>
                <p>size M</p>
              </div>
              <div>
                <p>1x</p>
              </div>
              <div>
                <p>Rp 40.000</p>
              </div>
            </li>
          </ul>
          <div className="border border-white"/>
          <div>
            <p>
              total
            </p>
          </div>
          <div>

          </div>
        </div>
      </div>

      <div class="col-start-2 col-span-4 ...">
        <select className="select select-bordered select-sm w-full max-w-xs bg-second text-white font-medium">
          <option disabled selected>
            Choose your shipping
          </option>
          <option>JNE</option>
          <option>JNT</option>
          <option>SiCepat Regular</option>
        </select>
      </div>

      <div class="col-start-2 col-span-4 ...">
        <span className="text-md font-medium">Payment Method</span>
      </div>

      <div class="bg-slate-300 col-start-2 col-span-4">
        <div class="relative inline-block">
          <input type="radio" aria-label="Radio" className="btn" />
          <div class="absolute inset-x-6 top-0  ...">
            <input type="radio" class="checked:border-indigo-500 ..." />
          </div>
        </div>
      </div>

      <div class="bg-slate-300 col-start-2 col-span-4 ...">
        <div className="inline-block space-y-1">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-xs w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-xs w-full max-w-xs"
          />
          <div class="flex space-x-4 ...">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-xs w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-xs w-full max-w-xs"
            />
          </div>
        </div>
      </div>
      <div class="bg-slate-300 col-start-2 col-span-4">
        <div className="flex space-x-11">
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            Pay Now
          </button>
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default Payment;
