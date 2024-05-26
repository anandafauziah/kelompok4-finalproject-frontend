import { useParams } from "react-router";
import products from "../data/products";
import Header from "../components/Header";
import { FaCartPlus, FaMoneyBill } from "react-icons/fa";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const DetailProductPage = () => {
  const { slug } = useParams();

  function unslugify(slug) {
    return slug.split("-").join(" ");
  }

  const product = products.find((item) => item.name.toLowerCase() == unslugify(slug));

  const relatedProducts = products
    .filter((item) => {
      if (item.id !== product.id) {
        return item.category == product.category;
      }
    })
    .slice(0, 5);

  const [qty, setQty] = useState(1);

  const increment = () => {
    setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <Helmet>
        <title>JO'E Cape | {product.name}</title>
      </Helmet>
      <Header title={product.name} />
      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="flex justify-center px-10">
          <div className="flex flex-col flex-wrap justify-center border">
            <img src={product.image} alt={product.name} width={150} height={150} />
            <img src={product.image} alt={product.name} width={150} height={150} />
            <img src={product.image} alt={product.name} width={150} height={150} />
            <img src={product.image} alt={product.name} width={150} height={150} />
          </div>
          <img className="w-3/4 border" src={product.image} alt={product.name} />
        </div>
        <div className="flex flex-col gap-3 md:w-1/3 px-4">
          <div className="font-semibold text-xl">{product.name}</div>
          <div className="text-slate-500 font-semibold">${product.price}</div>
          <div className="">
            <div className="font-semibold text-lg">Deskripsi:</div>
            <p className="text-slate-500">{product.description}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex items-center">
              <div className="font-semibold text-lg me-2">Size :</div>
              <div className="p-2 rounded duration-500 text-second font-semibold">XL</div>
            </div>
            <div className="flex items-center">
              <div className="font-semibold text-lg me-2">Quantity :</div>
              <button className="px-3 py-1 rounded duration-500 text-third font-semibold bg-first hover:text-first hover:bg-third" onClick={decrement}>
                -
              </button>
              <button className="px-3 py-1 rounded duration-500 text-first font-semibold bg-third" disabled>
                {qty}
              </button>
              <button className="px-3 py-1 rounded duration-500 text-third font-semibold bg-first hover:text-first hover:bg-third" onClick={increment}>
                +
              </button>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <button className="bg-first text-third rounded px-4 py-2 hover:text-first hover:bg-third duration-500">
              <div className="flex items-center gap-2">
                <FaMoneyBill />
                Buy
              </div>
            </button>
            <button className="bg-first text-third rounded px-4 py-2 hover:text-first hover:bg-third duration-500">
              <div className="flex items-center gap-2">
                <FaCartPlus />
                Cart
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10 gap-y-16">
          <div className="font-semibold text-3xl">Related Products</div>
          <div className="flex flex-wrap items-center justify-center md:px-8 gap-x-5 gap-y-12 md:gap-y-10">
            {relatedProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard name={product.name} price={product.price} detail={product.detail} imageUrl={product.image} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailProductPage;
