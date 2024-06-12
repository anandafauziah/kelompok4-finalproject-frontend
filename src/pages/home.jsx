import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../slices/cartSlices";
import useLogin from "../hooks/useLogin";
import { fetchProduct } from "../slices/productSlice";

const HomePage = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Home";
  }, []);

  useLogin();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [token]);

  const { products, loading } = useSelector((state) => state.product);
  const cartLoading = useSelector((state) => state.cart.loading);
  const [newArrivals, setNewArrivals] = useState([]);

  // Fetch Products
  useEffect(() => {
    dispatch(fetchProduct());
    setNewArrivals(products?.slice(-5));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-third">
        <Navbar />
      </div>
      {cartLoading && (
        <div className="absolute top-32 left-1/2 text-lg">
          <span className="loading loading-spinner loading-lg text-second"></span>
        </div>
      )}
      <div className="text-center font-semibold text-2xl mt-24">New Arrivals</div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-10 md:px-16 my-20 grow">
        {loading ? (
          <div className="absolute top-1/3 left-1/2 text-lg">
            <span className="loading loading-bars loading-lg text-first"></span>
          </div>
        ) : (
          newArrivals?.map((product) => {
            return (
              <div key={product.id}>
                <ProductCard id={product.id} title={product.title} price={product.price} imageUrl={product.image} />
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
