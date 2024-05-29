// components
import React from "react";

import CardBarChart from "../../components/admin/Cards/CardBarCharts";
import CardOrders from "../../components/admin/Cards/CardOrders";

export default function Dashboard() {
  document.title = "JO'E Cape | Dashboard";
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
