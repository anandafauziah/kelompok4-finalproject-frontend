import { useParams } from "react-router";
import Header from "../components/Header";
import { FaCartPlus, FaMoneyBill } from "react-icons/fa";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getProducts, getProduct } from "../api";
import { addToCart, updateCart, fetchCart } from "../slices/cartSlices";
import { useDispatch, useSelector } from "react-redux";

const DetailProductPage = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Detail Product";
  }, []);

  const { slug } = useParams();

  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        return;
      }
    };
    fetchProducts();
  }, []);

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(slug);
        setProduct(data.product);
      } catch (error) {
        return;
      }
    };
    fetchProduct();
  }, []);

  // Get Related Products
  const relatedProducts = products.filter((item) => item.category == product.category);

  const [qty, setQty] = useState(1);

  const increment = () => {
    setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const { user, token } = useSelector((state) => state.auth);
  const { carts } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleAddToCart = async (productId, quantity) => {
    const existItem = carts.find((item) => item.cart_items[0].product.id === productId);
    try {
      if (existItem?.cart_items[0].product.id === productId) {
        dispatch(updateCart({ cartId: existItem.id, productId, quantity: existItem.cart_items[0].quantity + quantity }, token));
        fetchCart(token);
        alert("Added to cart");
      } else if (existItem?.cart_items[0].product.id !== productId) {
        dispatch(addToCart({ productId, quantity }, token));
        fetchCart(token);
        alert("Added to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <Header title={product.title} />
      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="flex justify-center px-10">
          <div className="flex flex-col flex-wrap justify-center border">
            <img src={product.image} alt={product.name} width={150} height={150} />
            <img src={product.image} alt={product.name} width={150} height={150} />
            <img src={product.image} alt={product.name} width={150} height={150} />
            <img src={product.image} alt={product.name} width={150} height={150} />
          </div>
          <img className="w-3/4 border" src={product.image} alt={product.title} />
        </div>
        <div className="flex flex-col gap-3 md:w-1/3 px-4">
          <div className="font-semibold text-xl">{product.title}</div>
          <div className="font-semibold text-sm">{product.category}</div>
          <div className="text-slate-500 font-semibold">Rp{product.price}</div>
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
            <button
              className="bg-first text-third rounded px-4 py-2 hover:text-first hover:bg-third duration-500"
              onClick={() => {
                if (user?.data?.is_admin) {
                  alert("You're an admin");
                } else {
                  handleAddToCart(product.id, qty);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <FaCartPlus />
                Add to Cart
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
                  <ProductCard id={product.id} title={product.title} price={product.price} imageUrl={product.image} />
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
