import React, { useState } from "react";
import Header from "../components/Header";
// import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import products from "../data/products"; // Import data produk

const Cart = () => {
  // State untuk jumlah barang di keranjang belanja
  const [qty, setQty] = useState(1);

  // Fungsi untuk menambah jumlah barang di keranjang belanja
  const increment = () => {
    setQty(qty + 1);
  };

  // Fungsi untuk mengurangi jumlah barang di keranjang belanja
  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // Ambil produk pertama dari data produk sebagai contoh
  const product = products[0];

  return (
    <div className="flex flex-col gap-16">
      <Helmet>
        <title>JO'E Cape | Cart</title>
      </Helmet>
      <Header title="Your Shopping Cart" />
      <div className="cart-container px-40">
    {/* Table Title */}
    <div className="flex  justify-between bg-white rounded-xl shadow-md p-4 mb-5">
    <div className="gap-gty mr-20">
        <h3 className="product-title">Product</h3>
    </div>
        <h3 className="price">Price</h3>
        <h3 className="quantity">Quantity</h3>
        <h3 className="total">Total</h3>
    </div>
    {/* Item List */}
    <div className="cart-items flex justify-between bg-white rounded-xl shadow-md p-4">
        {/* image-name-remove */}
        <div className="flex items-center">
            <img src={product.image} alt={product.name} className="w-20 h-auto" />
            <div className="product-name ml-5">
                <h3>{product.name}</h3>
                <p>Size L</p>
                <button className="text-red-500">Remove</button>
            </div>
        </div>
        <div className="cart-product-price flex items-center">
            Rp {product.price}
        </div>
        <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded duration-500 text-third bg-first hover:text-first hover:bg-third" onClick={decrement}>
                -
            </button>
            <span className="px-3 py-1 rounded duration-500 text-first bg-third">{qty}</span>
            <button className="px-3 py-1 rounded duration-500 text-third bg-first hover:text-first hover:bg-third" onClick={increment}>
                +
            </button>
        </div>
        <div className="cart-product-total-price flex items-center">
            <p>Rp {product.price * qty}</p>
        </div>
    </div>
    <div className="total-checkoutbutton mt-10 flex justify-end">
        <h2 className="text-first mr-5 font-semibold">Total: Rp {product.price * qty}</h2>
        <button className="px-3 py-1 rounded duration-500 text-third bg-first hover:text-first hover:bg-third">
            Checkout
        </button>
    </div>
</div>


      <Footer />
    </div>
  );
};

export default Cart;
