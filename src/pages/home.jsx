import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import products from "../data/products";
import { Helmet, HelmetProvider } from "react-helmet-async";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-24">
      <HelmetProvider>
        <Helmet>
          <title>JO'E Cape | Home</title>
        </Helmet>
      </HelmetProvider>
      <Header title="Home" />
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
