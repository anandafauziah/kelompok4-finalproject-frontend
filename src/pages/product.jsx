import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { getProducts } from "../api";

const ProductPage = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Products";
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        return;
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-24">
      <Header title="Products" />
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-16 md:px-16">
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

export default ProductPage;
