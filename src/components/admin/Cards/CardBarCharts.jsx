import React from "react";
import { Chart } from "chart.js/auto";

export default function CardBarChart() {
  React.useEffect(() => {
    if (Chart.getChart("chart")) {
      Chart.getChart("chart")?.destroy();
    }
    let config = {
      type: "doughnut",
      data: {
        labels: ["Completed", "Processed", "Cancelled"],
        datasets: [
          {
            label: " Count",
            data: [300, 100, 50],
            backgroundColor: ["rgb(77, 255, 94)", "rgb(255, 154, 77)", "rgb(255, 77, 77)"],
            hoverOffset: 4,
          },
        ],
      },
    };
    let ctx = document.getElementById("chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
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
