import { FaEye } from "react-icons/fa";
import { useState } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { addToCart } from "../slices/cartSlice";

const ProductCard = (props) => {
  const { id, title, price, imageUrl } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchCart = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`${backendURL}/cart`);
      dispatch(setCart(response.data));
    } catch (error) {
      return;
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const existItem = cart.find((item) => item.cart_items[0].product.id === productId);

      if (existItem?.cart_items[0].product.id === productId) {
        await axios
          .put(
            `${backendURL}/cart/${existItem.id}`,
            { product_id: productId, quantity: existItem.cart_items[0].quantity + quantity },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((response) => console.log(response.data));
        dispatch(addToCart({ productId, quantity }));
      } else if (existItem?.cart_items[0].product.id !== productId) {
        await axios.post(`${backendURL}/cart`, { product_id: productId, quantity: quantity }).then((response) => console.log(response.data));
        dispatch(addToCart({ productId, quantity }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const indoCurrency = (price) => {
    return price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" });
  };

  return (
    <>
      <div className="flex flex-col justify-center max-w-xs h-[450px] w-[350px]" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
        <div className={`relative w-full h-full border rounded-md`}>
          <img className={`w-full h-full ${isHovered ? "scale-[103%] duration-700" : ""}`} src={imageUrl} alt={title} />
          <div className={`absolute flex flex-col gap-1 top-5 right-5 ${isHovered ? "" : "hidden"}`}>
            <a className="rounded-full p-3 border bg-white hover:bg-black hover:text-white duration-700" href={`/product/${slugify(title)}`}>
              <FaEye />
            </a>
          </div>
          <button
            className={`absolute bottom-5 left-10 w-3/4 p-2 bg-black text-white font-semibold rounded-md ${isHovered ? "slide-up" : "hidden"}`}
            onClick={() => {
              if (token) {
                if (user?.data?.is_admin) {
                  alert("You're an admin");
                } else {
                  handleAddToCart(id, 1);
                  alert("Added to cart");
                }
              } else {
                navigate("/login");
              }
            }}
          >
            Add to Cart
          </button>
        </div>
        <div className="p-2">
          <a href={`/product/${slugify(title)}`} className="text-lg font-semibold duration-700 hover:text-yellow-600">
            {title.slice(0, 30)}
          </a>
          <div className="">Rp{indoCurrency(price)},00</div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
