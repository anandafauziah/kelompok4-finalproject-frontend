import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/authSlice";
import { getUser } from "../api";
import { getProducts } from "../api";

const HomePage = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Home";
  }, []);

  // Fetch User Data
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(token);
        dispatch(setUser(data));
      } catch (error) {
        return;
      }
    };
    fetchUser();
  }, [token]);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data.slice(-5));
        setIsLoading(false);
      } catch (error) {
        return;
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-third">
        <Navbar />
      </div>
      <div className="text-center font-semibold text-2xl mt-24">New Arrivals</div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-10 md:px-16 my-20">
        {isLoading ? (
          <div className="absolute top-2/3 left-1/2 text-lg">
            <span className="loading loading-bars loading-lg text-first"></span>
          </div>
        ) : (
          products?.map((product) => {
            return (
              <div key={product.id}>
                <ProductCard name={product.title} price={product.price} detail={product.description} imageUrl={product.image} />
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
