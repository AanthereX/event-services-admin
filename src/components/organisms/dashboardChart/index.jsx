/** @format */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import labels from "../../../locale";
import ChartTabs from "../../molecules/chartTabs";
import { getDateBasedOnTab, kFormatter } from "../../../utils";
import { ThreeDots } from "react-loader-spinner";

const DashboardChart = ({
  chartData,
  loading = false,
  filter,
  setFilter = () => {},
  isChecked,
  setIsChecked = () => {},
}) => {
  const generateDynamicWeekData = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayIndex = new Date().getDay();

    // Order days of the week dynamically based on today
    const orderedDaysOfWeek = [
      ...daysOfWeek?.slice(todayIndex + 1),
      ...daysOfWeek?.slice(0, todayIndex + 1),
    ];

    // Base structure for weekly data
    const weeklyData = orderedDaysOfWeek?.reduce((acc, day) => {
      acc[day] = 0; // Default value for each day
      return acc;
    }, {});

    const apiWeeklyData = chartData?.Weekly || [];

    // Update the weekly data structure with API values
    apiWeeklyData.forEach((data) => {
      const day = data?.day_of_week.trim(); // trim in case of exrtra spaces in API response
      if (weeklyData?.hasOwnProperty(day)) {
        weeklyData[day] = data?.total_amount;
      }
    });

    return weeklyData;
  };

  const generateDynamicMonthData = () => {
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthIndex = new Date().getMonth();

    // Order months dynamically based on the current month
    const orderedMonthsOfYear = [
      ...monthsOfYear.slice(currentMonthIndex + 1),
      ...monthsOfYear.slice(0, currentMonthIndex + 1),
    ];

    // Base structure for monthly data
    const monthlyData = orderedMonthsOfYear.reduce((acc, month) => {
      acc[month] = 0; // Default value for each month
      return acc;
    }, {});

    // Get monthly data from API response
    const apiMonthlyData = chartData?.monthly || [];

    // Update the monthly data structure with API values
    apiMonthlyData.forEach((data) => {
      const [month] = data.month_year.trim().split(" "); // trim in case of exrtra spaces in API response
      if (monthlyData.hasOwnProperty(month)) {
        monthlyData[month] = data.total_amount;
      }
    });

    return monthlyData;
  };

  const generateDynamicYearData = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;

    // Base Structure for default values
    const yearData = {};
    for (let year = startYear; year <= currentYear; year++) {
      yearData[year] = 0;
    }

    // Get monthly data from API response
    const apiYearlyData = chartData?.yearly || [];

    // Update year data with API values
    apiYearlyData.forEach((data) => {
      const year = parseInt(data.year.trim(), 10); // Parse and clean the year in case of invalid data from API
      if (yearData.hasOwnProperty(year)) {
        yearData[year] = data.total_amount;
      }
    });

    return yearData;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${kFormatter(context.raw)}`, // Customize tooltip content
        },
      },
    },
    layout: {
      padding: {
        bottom: 70,
      },
    },
    scales: {
      x: {
        offset: true,
        beginAtZero: true,
        grid: {
          display: true,
          color: "#F9F9F9",
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#000",
        },
        gridLines: {
          tickMarkLength: 100,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false, // hidden yaxis values
          callback: (value) => `${value}`,
          color: "#000",
        },
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
  );

  const data = {
    labels:
      filter === "weekly"
        ? Object.keys(generateDynamicWeekData())
        : filter === "monthly"
        ? Object.keys(generateDynamicMonthData())
        : Object.keys(generateDynamicYearData()),
    datasets: [
      {
        fill: true,
        tension: 0.4,
        data:
          filter === "monthly"
            ? Object.values(generateDynamicMonthData())
            : filter === "weekly"
            ? Object.values(generateDynamicWeekData())
            : Object.values(generateDynamicYearData()),
        borderColor: "#66A5C4",
        backgroundColor: (context) => {
          const bgColor = [
            "rgba(241, 231, 254, 1)",
            "rgba(241, 232, 254, 1)",
            "rgba(242, 234, 254, 1)",
            "rgba(246, 239, 254, 1)",
            "rgba(247, 241, 254, 1)",
            "rgba(250, 246, 255, 1)",
          ];
          if (!context?.chart?.chartArea) {
            return null;
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          const colorMixes = 1 / (bgColor.length - 1);
          for (let i = 0; i < bgColor.length; i++) {
            gradientBg.addColorStop(0 + i * colorMixes, bgColor[i]);
          }
          return gradientBg;
        },
        // pointRadius: 0, // Hide the dots on the line
        // pointHoverRadius: 0, // Hide the dots on hover
      },
    ],
  };

  const tabOptions = [
    { id: 2, label: labels.week, value: "weekly" },
    { id: 3, label: labels.month, value: "monthly" },
    { id: 1, label: labels.year, value: "yearly" },
  ];

  return (
    <div
      className={`relative bg-white rounded-[16px] py-[33px] h-[345px] max-h-[345px] px-8 mb-[23px]`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-4">
          <p
            className={`text-fs_20 leading-[26px] capitalize text-c_242731 font-outfit_semiBold`}
          >
            {labels.statistics}
          </p>
          <p
            className={`text-fs_14 leading-[18px] capitalize text-c_5F6165 font-outfit_semiBold`}
          >
            {getDateBasedOnTab(filter)}
          </p>
        </div>

        <ChartTabs
          options={tabOptions}
          filter={filter}
          setFilter={setFilter}
          isChecked={isChecked}
          toggleText={isChecked ? "Service" : "Venue"}
          setIsChecked={setIsChecked}
        />
      </div>

      <div className="my-[22px]">{/* <Divider /> */}</div>

      <Line options={options} data={data} />

      {!!loading && (
        <div
          className={
            "absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center rounded-[16px]"
          }
        >
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color={"#66A5C4"}
            radius={"9"}
            ariaLabel={"three-dots-loading"}
            wrapperStyle={{}}
            wrapperClass={""}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardChart;
