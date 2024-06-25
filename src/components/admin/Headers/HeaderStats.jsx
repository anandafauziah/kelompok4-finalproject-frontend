import React, { useEffect, useState } from "react";

import CardStats from "../Cards/CardStats";
import { FaUsers, FaShirt, FaMoneyBill, FaReceipt } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../slices/userSlice";

export default function HeaderStats() {
  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    dispatch(fetchUser());
    const customers = users.filter((item) => !item.data.is_admin);
    setCustomers(customers);
  }, [token]);

  const { orders } = useSelector((state) => state.order);
  const { payments } = useSelector((state) => state.payment);

  return (
    <>
      {/* Header */}
      <div className="relative bg-second md:pt-32 pb-24 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Users" statTitle={(customers && customers?.length) || 0} statIconName={<FaUsers />} statIconColor="bg-first" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Products" statTitle={(products && products?.length) || 0} statIconName={<FaShirt />} statIconColor="bg-first" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Orders" statTitle={(orders && orders?.length) || 0} statIconName={<FaReceipt />} statIconColor="bg-first" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Payments" statTitle={(payments && payments?.length) || 0} statIconName={<FaMoneyBill />} statIconColor="bg-first" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
