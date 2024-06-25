import { useEffect } from "react";
import PaymentTable from "../../components/admin/Cards/PaymentTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchPayment } from "../../slices/paymentSlice";
import { fetchOrder } from "../../slices/orderSlice";

export default function Payment() {
  useEffect(() => {
    document.title = "JO'E Cape | Payment";
  }, []);

  // Fetch Orders
  const { token } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayment());
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          <PaymentTable />
        </div>
      </div>
    </>
  );
}
