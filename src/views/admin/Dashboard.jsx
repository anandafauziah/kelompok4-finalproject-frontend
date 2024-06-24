import React, { useEffect } from "react";

import CardBarChart from "../../components/admin/Cards/CardBarCharts";
import CardOrders from "../../components/admin/Cards/CardOrders";
import { fetchOrder } from "../../slices/orderSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  useEffect(() => {
    document.title = "JO'E Cape | Dashboard";
  }, []);

  // Fetch Orders
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    axios
      .get(`${backendURL}/updateOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(fetchOrder(token));
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardOrders />
        </div>
      </div>
    </>
  );
}
