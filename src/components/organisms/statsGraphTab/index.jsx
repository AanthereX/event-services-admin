/** @format */

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  BarController,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import labels from "../../../locale";
import SelectInput from "../../molecules/selectInputDropdown";
import { kFormatter } from "../../../utils";
import Paragraph from "../../atoms/paragraph";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";

const StatisticGraph = ({ selectedItem = null, setSelectedItem }) => {
  const { DownloadIcon, Download } = Icons;
  const [selected, setSelected] = useState(
    selectedItem || {
      label: "Yearly",
      value: "yearly",
    },
  );

  const total = 1000;

  useEffect(() => {
    if (selectedItem) {
      setSelected(selectedItem);
    }
  }, [selectedItem]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  ChartJS.register(
    CategoryScale,
    BarElement,
    BarController,
    LinearScale,
    Tooltip,
    Filler,
  );

  const labelsArr =
    selected && selected.value?.toLowerCase() === "monthly"
      ? [
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
        ]
      : selected && selected.value?.toLowerCase() === "yearly"
      ? [`2020`, "2021", "2022", "2023", "2024"]
      : [
          "Mon\nSep 12,24",
          "Tue\nSep 12,24",
          "Wed\nSep 12,24",
          "Thurs\nSep 12,24",
          "Fri\nSep 12,24",
          "Sat\nSep 12,24",
          "Sun\nSep 12,24",
        ];

  const data = {
    labels: labelsArr,
    datasets: [
      {
        label: "Total Earnings",
        barPercentage: 0.5,
        barThickness: labelsArr.map((_, index) =>
          index === hoveredIndex ? 40 : 31,
        ),
        maxBarThickness: 40,
        borderRadius: 8,
        minBarLength: 31,
        data: [
          550, 1000, 15000, 9000, 4000, 9000, 11000, 20000, 15000, 14000, 13000,
          12000,
        ],
        backgroundColor: labelsArr.map((_, index) =>
          index === hoveredIndex ? "#66A5C4" : "#F2EFFF",
        ),
      },
    ],
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
          label: (context) => `${kFormatter(context.raw)}`,
        },
      },
    },
    layout: {
      padding: {
        bottom: 38,
      },
    },
    scales: {
      x: {
        offset: true,
        beginAtZero: true,
        grid: {
          display: false,
          color: "#F9F9F9",
        },

        border: {
          display: false,
        },
        ticks: {
          // Set tick callback to render custom labels
          callback: (value, index) => {
            const label = labelsArr[index] || "";
            return label.split("\n"); // Split for multi-line
          },
        },
      },
      y: {
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
          display: true,
          callback: (value) => `${kFormatter(value)}`,
          font: {
            family: "outfit-medium",
            size: 12,
          },
        },
      },
    },
    onHover: (event, elements) => {
      if (elements.length) {
        const index = elements[0].index; // Get the index of the hovered element
        setHoveredIndex(index); // Set the hovered index
      } else {
        setHoveredIndex(null); // Reset on mouse leave
      }
    },
  };

  const dropDownOptions = [
    { label: "Yearly", value: "yearly" },
    { label: "Monthly", value: "monthly" },
    { label: "Weekly", value: "weekly" },
  ];

  return (
    <div className='!w-full bg-white rounded-[16px] py-[33px] h-[430px] max-h-[430px] px-8 mb-[23px]'>
      <div className='flex sm:flex-row sm:items-center  flex-col items-start gap-3 sm:gap-0 justify-between mb-[22px]'>
        <div className='flex flex-col items-start justify-center gap-[9px]'>
          <Paragraph className='!text-fs_22 !leading-[27px] !capitalize !text-black !font-outfit_semiBold'>
            {selected?.value === "yearly"
              ? labels.yearlyEarning
              : selected?.value === "monthly"
              ? labels.monthlyEarning
              : labels.weeklyEarning}
          </Paragraph>
          <Paragraph className='!text-fs_20 !leading-[24px] !capitalize !text-c_primary !font-outfit_semiBold'>
            {`${labels.omanCurrency} ${total}`}
          </Paragraph>
        </div>

        {selectedItem ? null : (
          <div className={"flex items-center gap-3"}>
            <SelectInput
              options={dropDownOptions}
              isMulti={false}
              placeholder={null}
              isOptionDisabled={false}
              onChange={(e) => {
                setSelected(e);
              }}
              value={selected}
            />

            <Button
              imageUrl={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIE55kfdEkUKZu3REj8I6EJkDf0UibWfQthQ&s"
              }
              img={Download}
              // label="Download"
              className={`flex  justify-between  items-center   !bg-c_primary text-white !py-2 px-3 !h-[40px]  `}
            />
            {/* <Button
              variant={"none"}
              size={"none"}
              label={null}
              img={DownloadIcon}
              width={40}
              height={40}
              imgAlt={"downloadicon"}
              className={"!w-[40px] !bg-c_primary !h-[40px]"}
              onClick={() => {}}
            /> */}
          </div>
        )}
      </div>

      <Bar options={options} data={data} />
    </div>
  );
};

export default StatisticGraph;
