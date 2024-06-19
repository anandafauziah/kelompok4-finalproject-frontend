import React, { useEffect } from "react";

import CardStats from "../Cards/CardStats";
import { FaUsers, FaShirt, FaMoneyBill, FaReceipt } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../slices/userSlice";

export default function HeaderStats() {
  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(token));
  }, [token]);

  const { users } = useSelector((state) => state.user);

  return (
    <>
      {/* Header */}
      <div className="relative bg-second md:pt-32 pb-24 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Users" statTitle={users?.data.length} statIconName={<FaUsers />} statIconColor="bg-first" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Products" statTitle={products?.length} statIconName={<FaShirt />} statIconColor="bg-first" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Orders" statTitle="9" statIconName={<FaReceipt />} statIconColor="bg-first" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Payments" statTitle="9" statIconName={<FaMoneyBill />} statIconColor="bg-first" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
