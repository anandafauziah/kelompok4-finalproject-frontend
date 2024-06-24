import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";

export default function CardBarChart() {
  const { orders } = useSelector((state) => state.order);

  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    if (orders) {
      setUnpaidOrders(orders.filter((item) => item.status === "Unpaid"));
      setPaidOrders(orders.filter((item) => item.status === "Paid"));
      setAcceptedOrders(orders.filter((item) => item.status === "Accepted"));
    }

    if (Chart.getChart("chart")) {
      Chart.getChart("chart")?.destroy();
    }
    let config = {
      type: "doughnut",
      data: {
        labels: ["Unpaid", "Paid", "Accepted"],
        datasets: [
          {
            label: " Count",
            data: [unpaidOrders.length || 0, paidOrders.length || 0, acceptedOrders.length || 0],
            backgroundColor: ["rgb(255, 154, 77)", "rgb(86, 141, 252)", "rgb(77, 255, 94)"],
            hoverOffset: 4,
          },
        ],
      },
    };
    let ctx = document.getElementById("chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [orders]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-700 text-xl font-semibold">Orders Chart</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
