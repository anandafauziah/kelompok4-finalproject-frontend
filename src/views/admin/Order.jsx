import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../../components/admin/Cards/OrderTable";
import axios from "axios";
import { fetchOrder } from "../../slices/orderSlice";
import { useEffect } from "react";

export default function Order() {
  useEffect(() => {
    document.title = "JO'E Cape | Order";
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
        dispatch(fetchOrder());
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          <OrderTable />
        </div>
      </div>
    </>
  );
}
