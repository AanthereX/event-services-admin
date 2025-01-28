/** @format */

import React, { Fragment, useCallback, useEffect, useState } from "react";
import labels from "../../locale";
import DashboardCard from "../../components/organisms/dashboardCard";
import Heading from "../../components/atoms/heading";
import Button from "../../components/atoms/button";
import StatsTable from "../../components/organisms/tables/statsTable";
import { servicesData, venueData } from "../../constants/Stats.constants";
import { Icons } from "../../assets/icons";
import Modal from "../../components/molecules/modal";
import ExportDataForm from "../../components/molecules/forms/exportDataForm";
import { useLazyGetAllStatisticsDataQuery } from "../../services/statisticService";
import { setStatisticsData } from "../../store/slices/statistics.slice";
import { useDispatch } from "react-redux";

const data = [
  {
    id: 1,
    title: labels.totalVenues,
    count: 1035,
    value: "11.02",
    isProfit: null,
    bgColor: "bg-c_FFC17A",
  },
  {
    id: 2,
    title: labels.totalBookedVenues,
    count: 5000,
    value: "0.02",
    isProfit: null,
    bgColor: "bg-c_D5C8FF",
  },
  {
    id: 3,
    title: labels.totalVenuesRevenue,
    count: 1156,
    value: "15.03",
    isProfit: true,
    bgColor: "bg-c_E3F5FF",
  },
  {
    id: 4,
    title: labels.totalServices,
    count: 120,
    value: "11.02",
    isProfit: null,
    bgColor: "bg-c_30E9F9",
  },
  {
    id: 5,
    title: labels.totalOfferedServices,
    count: 120,
    value: "11.02",
    isProfit: null,
    bgColor: "bg-c_8CD2FD",
  },
  {
    id: 6,
    title: labels.totalServicesRevenue,
    count: 120,
    value: "15.03",
    isProfit: true,
    bgColor: "bg-c_E5ECF6",
  },
];

const Statistics = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(true);
  const [exportData, setExportData] = useState(false);
  const [loading, setLoading] = useState(true);

  const [getAllStatisticsData, { isLoading, isFetching, isError }] =
    useLazyGetAllStatisticsDataQuery();

  const changeValue = useCallback(() => {
    setSelected((selected) => !selected);
  }, [selected]);

  const handlerGetAllStatisticsData = useCallback(async (_type, _filter) => {
    setLoading(true);
    try {
      const response = await getAllStatisticsData().unwrap();
      if (!response?.data) return;
      const {
        totalVenues,
        totalService,
        totalBookedVenues,
        totalBookedServices,
        serviceStatsDetails,
        venueStatsDetails,
      } = response.data;
      dispatch(
        setStatisticsData({
          data: {
            totalVenues,
            totalService,
            totalBookedVenues,
            totalBookedServices,
            serviceStatsDetails,
            venueStatsDetails,
          },
        }),
      );
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handlerGetAllStatisticsData();
  }, []);

  return (
    <Fragment>
      <div className="mb-6 flex justify-between items-center">
        <Heading className="md:text-fs_32 text-fs_24">{labels?.stats}</Heading>
        <Button
          onClick={() => setExportData(true)}
          img={Icons.Download}
          label={"Export"}
          className={`flex  justify-center !text-white  items-center !w-auto  !bg-c_primary !py-2 px-4`}
        />
      </div>
      <div className="grid grid-cols-4 gap-6">
        {data?.map((item, idx) => {
          return (
            <DashboardCard
              type={"stats"}
              count={item?.count}
              title={item?.title}
              isProfit={item?.isProfit}
              value={item?.value}
              key={idx}
              index={idx}
              className={`${
                idx == 2 || idx == 5
                  ? "lg:col-span-2 col-span-4 "
                  : "lg:col-span-1  col-span-2"
              } `}
              bgColor={item.bgColor}
            />
          );
        })}
      </div>

      <div className={"mt-6 bg-white rounded-[16px] "}>
        <div className="flex justify-between p-5 pb-0  flex-wrap gap-4 items-center">
          <Heading className="md:text-fs_32 text-fs_24">
            {!selected ? labels?.venues : labels.services}
          </Heading>
          <div className="flex items-center gap-3">
            <Button
              className={` w-[110px] font-outfit_regular text-fs_16 px-3 ${
                selected == true
                  ? "text-white bg-c_primary "
                  : "bg-transparent text-black"
              } border-2 border-c_primary`}
              onClick={changeValue}
              label={labels.services}
            />

            <Button
              className={` w-[110px] font-outfit_regular text-fs_16 px-3 
                ${
                  selected == false
                    ? "text-white bg-c_primary "
                    : "bg-transparent text-black"
                } 
                border-2 border-c_primary
                `}
              onClick={changeValue}
              label={labels.venues}
            />
          </div>
        </div>
        <StatsTable
          header={
            selected
              ? labels.statisticsServicesHeader
              : labels.statisticsVenueHeader
          }
          type={selected ? labels.services : labels.venues}
          data={selected ? servicesData : venueData}
        />
      </div>

      {exportData ? (
        <Modal
          isOpen={exportData}
          closeModal={() => setExportData(false)}
          containerClassName={"!max-w-[700px] !w-[480px]"}
          title={labels.exportData}
          content={<ExportDataForm />}
        />
      ) : null}
    </Fragment>
  );
};

export default Statistics;
