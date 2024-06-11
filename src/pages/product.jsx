import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { fetchCart } from "../slices/cartSlices";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import { fetchProduct } from "../slices/productSlice";

const ProductPage = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Product";
  }, []);

  useLogin();

  // Fetch Products
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const { products, loading } = useSelector((state) => state.product);

  // Fetch Cart if token exist
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-24 min-h-screen">
      <Header title="Products" />
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-16 md:px-16 grow">
        {loading ? (
          <div className="absolute top-1/3 text-lg">
            <span className="loading loading-bars loading-lg text-first"></span>
          </div>
        ) : (
          products?.map((product) => {
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

export default ProductPage;
