import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/authSlice";
import { getUser } from "../api";

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
        console.log(error.response);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <div className="flex flex-col gap-24">
      {/* <Header title={"Home"} /> */}
      <div className="bg-third">
        <Navbar />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-10 md:px-16">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard name={product.name} price={product.price} detail={product.detail} imageUrl={product.image} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
