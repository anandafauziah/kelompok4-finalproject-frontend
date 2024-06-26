import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../slices/cartSlices";
import useLogin from "../hooks/useLogin";
import { fetchProduct } from "../slices/productSlice";
import { fetchProvince } from "../slices/provinceSlice";

const HomePage = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Home";
  }, []);

  useLogin();

  // Fetch Provinces
  const { provinces } = useSelector((state) => state.province);

  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(fetchProvince());
    }
  }, [provinces]);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (token && !user?.data?.is_admin) {
      dispatch(fetchCart(token));
    }
  }, [token, user]);

  const { products, loading } = useSelector((state) => state.product);
  const cartLoading = useSelector((state) => state.cart.loading);
  const [newArrivals, setNewArrivals] = useState([]);
  const [newArrivalsLoading, setNewArrivalsLoading] = useState(false);

  // Fetch Products
  useEffect(() => {
    setNewArrivalsLoading(true);
    dispatch(fetchProduct()).then(() => {
      setNewArrivals(products.slice(0, 4));
    });
    setNewArrivalsLoading(false);
  }, []);

  console.log(newArrivals);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-third">
        <Navbar />
      </div>
      {cartLoading && (
        <div className="fixed top-1/3 left-1/2 text-lg z-[99999]">
          <span className="loading loading-bars loading-lg text-first"></span>
        </div>
      )}
      {newArrivalsLoading && (
        <div className="fixed top-1/3 left-1/2 text-lg z-[99999]">
          <span className="loading loading-bars loading-lg text-first"></span>
        </div>
      )}
      <div className="text-center font-semibold text-2xl mt-24">New Arrivals</div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-10 md:px-16 my-20 grow">
        {loading ? (
          <div className="fixed top-1/3 left-1/2 text-lg z-[99999]">
            <span className="loading loading-bars loading-lg text-first"></span>
          </div>
        ) : (
          newArrivals.map((product) => {
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
