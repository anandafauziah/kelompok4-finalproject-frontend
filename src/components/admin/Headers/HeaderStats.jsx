import React from "react";

// components

import CardStats from "../Cards/CardStats";
import { FaUsers, FaShirt, FaMoneyBill, FaReceipt } from "react-icons/fa6";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-second md:pt-32 pb-24 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Users" statTitle="999" statIconName={<FaUsers />} statIconColor="bg-first" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats statSubtitle="Products" statTitle="999" statIconName={<FaShirt />} statIconColor="bg-first" />
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
