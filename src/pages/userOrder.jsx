import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import useLogin from "../hooks/useLogin";
import { fetchOrder } from "../slices/orderSlice";
import axios from "axios";

const UserOrder = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Order";
  }, []);

  useLogin();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { orders, loading } = useSelector((state) => state.order);

  // Fetch User Orders
  useEffect(() => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    axios
      .get(`${backendURL}/updatePaidOrders/${user?.data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(fetchOrder(token));
      })
      .catch((err) => console.log(err));
  }, [token]);

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (orders.length > 0) {
      const items = orders.filter((item) => item.user.id === user.data.id);
      setUserOrders(items);
    }
  }, [orders]);

  return (
    <div className="flex flex-col gap-16 min-h-screen">
      <Header title="Your Orders" />
      <div className="cart-container px-4 md:px-32 grow">
        {loading && (
          <div className="fixed top-1/2 left-1/2 z-[9999]">
            <span className="loading loading-spinner loading-lg text-first"></span>
          </div>
        )}
        {loading && (
          <div className="fixed top-1/2 left-1/2 z-[9999]">
            <span className="loading loading-spinner loading-lg text-first"></span>
          </div>
        )}
        {/* Item List */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Ordered at</th>
                <th>Ship to</th>
              </tr>
            </thead>
            <tbody>
              {userOrders?.length > 0 ? (
                userOrders.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.order_id}</td>
                      <td>
                        {item.items.map((i) => {
                          return (
                            <div className="flex items-center gap-x-3 mb-2" key={i.id}>
                              {i.quantity}x
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img src={i.image} alt={i.title} />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold text-xs">{i.title}</div>
                                <div className="text-xs opacity-75">
                                  {i.category} | Size : {i.size}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {Intl.NumberFormat("id", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.amount)}
                      </td>
                      <td>
                        {item.status === "Unpaid" ? (
                          <div className="flex flex-wrap gap-2 items-center justify-center">
                            {item.status}
                            <button
                              className="btn btn-success text-white btn-xs"
                              onClick={() => {
                                window.open(item.snap_url, "_blank");
                                window.location.replace("/");
                              }}
                            >
                              Pay Now
                            </button>
                          </div>
                        ) : (
                          item.status
                        )}
                      </td>
                      <td>{item.date}</td>
                      <td>{item.ship_address}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    Empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserOrder;
