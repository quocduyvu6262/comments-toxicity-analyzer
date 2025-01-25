import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

interface SeriesData {
  x: number;
  y: number;
}

interface Series {
  name: string;
  data: SeriesData[];
}

const emptyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Histogram: React.FC<any> = ({ histogramData }) => {
  const [selectedMetric, setSelectedMetric] = useState("Toxicity");
  const [series, setSeries] = useState<Series[]>([
    {
      name: "Count",
      data: [],
    },
  ]);

  const metricHistogram: Record<string, number[]> = {
    Toxicity: histogramData["TOXICITY"] || emptyArray,
    "Severe Toxicity": histogramData["SEVERE_TOXICITY"] || emptyArray,
    "Identity Attack": histogramData["IDENTITY_ATTACK"] || emptyArray,
    Insult: histogramData["INSULT"] || emptyArray,
    Profanity: histogramData["PROFANITY"] || emptyArray,
    Threat: histogramData["THREAT"] || emptyArray,
  };

  useEffect(() => {
    const newSeries = [
      {
        name: "Count",
        data: Array.from({ length: 10 }, (_, i) => ({
          x: i / 10 + 0.05, // Ensure x values are numbers or strings
          y: metricHistogram[selectedMetric][i], // Get corresponding y values from the histogram
        })),
      },
    ];
    setSeries(newSeries);
  }, [selectedMetric]);

  const options: ApexOptions = {
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "50%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: "95%",
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },

    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    xaxis: {
      type: "numeric",
      min: 0.0,
      max: 1.0,
      tickAmount: 10,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        formatter: (x) => {
          const lowerBound = (x - 0.05).toFixed(1); // Calculate lower bound
          const upperBound = (x + 0.05).toFixed(1); // Calculate upper bound
          return `Range ${lowerBound} - ${upperBound}`;
        },
      },
      y: {
        formatter: (y: number) => {
          return `${Math.round(y)}`;
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Metric Score Distribution
          </h4>
        </div>
        <div>
          <DefaultSelectOption
            selectedOption={selectedMetric}
            setSelectedOption={setSelectedMetric}
            options={[
              "Toxicity",
              "Severe Toxicity",
              "Identity Attack",
              "Insult",
              "Profanity",
              "Threat",
            ]}
          />
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default Histogram;
