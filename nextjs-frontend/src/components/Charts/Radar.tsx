import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { max } from "@floating-ui/utils";

const Radar: React.FC<any> = ({ averageScoreData }) => {
  // @ts-ignore
  const maxScore = Math.max(...Object.values(averageScoreData));
  const [state, setState] = React.useState({
    series: [
      {
        name: "Percentage",
        data:
          [
            averageScoreData["TOXICITY"] || 0,
            averageScoreData["SEVERE_TOXICITY"] || 0,
            averageScoreData["IDENTITY_ATTACK"] || 0,
            averageScoreData["INSULT"] || 0,
            averageScoreData["PROFANITY"] || 0,
            averageScoreData["THREAT"],
          ] || 0,
      },
    ],
    options: {
      chart: {
        height: 335,
        type: "radar",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "10px",
          fontFamily: "Satoshi, sans-serif",
          fontWeight: "bold",
        },
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      colors: ["#5750F1"],
      tooltip: {
        y: {
          formatter: function (val: any) {
            return `${val}%`;
          },
        },
      },
      xaxis: {
        categories: [
          "Toxicity",
          "Severe Toxicity",
          "Identity Attack",
          "Insult",
          "Profanity",
          "Threat",
        ],
        labels: {
          style: {
            fontSize: "15px",
            fontWeight: "bold",
            fontFamily: "Satoshi, sans-serif",
          },
          offsetY: 4,
        },
      },
      yaxis: {
        min: 0,
        max: maxScore < 100 ? maxScore * 1.2 : 100,
        labels: {
          style: {
            fontSize: "10px",
            fontWeight: "bold",
            fontFamily: "Satoshi, sans-serif",
          },
          formatter: function (value: number) {
            return value.toFixed(0); // Change to `Math.round(value)` for integer values
          },
        },
      },
    },
  });

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Average Percentage Overview
          </h4>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-3.5">
          <ReactApexChart
            // @ts-ignore
            options={state.options}
            series={state.series}
            type="radar"
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default Radar;
