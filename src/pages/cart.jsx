import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setTotalPrice, addToCart, removeItem } from "../slices/cartSlice";
import axios from "axios";

const Cart = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Cart";
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { cart, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // Fetch Cart
  useEffect(() => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${backendURL}/cart`);
        dispatch(setCart(response.data));
        total(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);

  const indoCurrency = (price) => {
    return price?.toLocaleString("id-ID", { styles: "currency", currency: "IDR" });
  };

  const total = (cart) => {
    if (Array.isArray(cart)) {
      const total = cart.reduce((acc, curr) => acc + curr.total_price, 0);
      if (total) {
        dispatch(setTotalPrice(total));
      }
      return total;
    }
  };

  const handleRemoveItem = (cartId, productId, token) => {
    dispatch(removeItem({ cartId, productId }, token));
    fetchCart();
  };

  const handleAddToCart = async (productId, quantity) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-16 min-h-screen">
      <Header title="Your Shopping Cart" />
      <div className="cart-container px-4 md:px-32 grow">
        {/* Item List */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : cart.length > 0 ? (
                cart.map((item, id) => {
                  return (
                    <tr key={id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.cart_items[0].product.image} alt={item.cart_items[0].product.title} />
                            </div>
                          </div>
                          <div>
                            <a href={`/product/${item.cart_items[0].product.slug}`} className="duration-500 hover:text-second">
                              <div className="font-bold">{item.cart_items[0].product.title}</div>
                            </a>
                            <div className="text-xs">
                              Size: <span className="opacity-75">{item.cart_items[0].product.size}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>Rp{indoCurrency(item.cart_items[0].product.price)},00</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <button
                            className="px-3 py-1 rounded duration-500 text-third bg-first hover:text-first hover:bg-third"
                            onClick={() => {
                              handleAddToCart(item.cart_items[0].product.id, -1);
                            }}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 rounded duration-500 text-first bg-third">{item.cart_items[0].quantity}</span>
                          <button
                            className="px-3 py-1 rounded duration-500 text-third bg-first hover:text-first hover:bg-third"
                            onClick={() => {
                              handleAddToCart(item.cart_items[0].product.id, 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>Rp{indoCurrency(item.cart_items[0].product.price * item.cart_items[0].quantity)},00</td>
                      <td>
                        <button
                          className="btn btn-xs btn-error text-white"
                          onClick={() => {
                            if (confirm("Remove item?")) {
                              handleRemoveItem(item.id, item.cart_items[0].product.id, token);
                            }
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="total-checkoutbutton mt-10 flex items-center justify-end">
          {!isLoading && (
            <>
              <h2 className="text-first mr-5 font-semibold">Total: Rp{indoCurrency(totalPrice) || 0},00</h2>
              <button className="px-3 py-1 rounded duration-500 text-third bg-first hover:text-first hover:bg-third">Checkout</button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
