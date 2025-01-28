/** @format */

import { createSlice } from "@reduxjs/toolkit";
import labels from "../../locale";
import { calculatePercentageChange } from "../../utils";

const initialState = {
  StatisticsData: [
    {
      id: 1,
      title: labels.totalVenues,
      count: 0,
      value: "",
      isProfit: null,
      bgColor: "bg-c_FFC17A",
    },
    {
      id: 2,
      title: labels.totalBookedVenues,
      count: 0,
      value: "",
      isProfit: null,
      bgColor: "bg-c_D5C8FF",
    },
    {
      id: 3,
      title: labels.totalVenuesRevenue,
      count: 0,
      value: "",
      isProfit: null,
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
      count: 0,
      value: "",
      isProfit: null,
      bgColor: "bg-c_8CD2FD",
    },
    {
      id: 6,
      title: labels.totalServicesRevenue,
      count: 0,
      value: "",
      isProfit: null,
      bgColor: "bg-c_E5ECF6",
    },
  ],
  ChartData: null,
  TableDataList: null,
  pageData: null,
};

export const StatisticSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatisticsData: (state, action) => {
      const apiData = action.payload?.data;
      console.log(apiData, "apiData");
      state.StatisticsData = state.StatisticsData.map((item) => {
        switch (item.title) {
          case labels.totalVenues || "Total Venues":
            return {
              ...item,
              count: apiData.totalVenues,
              isProfit:
                apiData?.currentWeekTotalEvent > apiData.previousWeekEvents,
              value: calculatePercentageChange(
                apiData.previousWeekEvents,
                apiData.currentWeekTotalEvent,
              ),
            };
          case labels.totalBookedVenues || "Total Booked Venues":
            return {
              ...item,
              count: apiData?.totalBookedVenues,
              isProfit: apiData.currentWeekTotalUser > apiData.previousWeekUser,
              value: calculatePercentageChange(
                apiData.previousWeekUser,
                apiData.currentWeekTotalUser,
              ),
            };
          case labels.totalVenuesRevenue || "Total Venue Revenues":
            return {
              ...item,
              count: apiData.venueStatsDetails[0]?.totalRevenue,
              isProfit: apiData.currentWeekVendor > apiData.pastWeekVendor,
              value: calculatePercentageChange(
                apiData.pastWeekVendor,
                apiData.currentWeekVendor,
              ),
            };
          case labels.totalServices || "Total Services":
            return {
              ...item,
              count: apiData?.totalService,
              isProfit: apiData.currentWeekVendor > apiData.pastWeekVendor,
              value: calculatePercentageChange(
                apiData.pastWeekVendor,
                apiData.currentWeekVendor,
              ),
            };
          case labels.totalOfferedServices || "Total Offered Services":
            return {
              ...item,
              count: apiData?.totalBookedServices,
              isProfit: apiData.currentWeekVendor > apiData.pastWeekVendor,
              value: calculatePercentageChange(
                apiData.pastWeekVendor,
                apiData.currentWeekVendor,
              ),
            };
          case labels.totalServicesRevenue || "Total Services Revenues":
            return {
              ...item,
              count: apiData?.serviceStatsDetails[0]?.totalRevenue,
              isProfit: apiData.currentWeekVendor > apiData.pastWeekVendor,
              value: calculatePercentageChange(
                apiData.pastWeekVendor,
                apiData.currentWeekVendor,
              ),
            };
          default:
            return item;
        }
      });
    },
    setChartData: (state, action) => {
      state.ChartData = action.payload?.data;
    },
    setUpcomingEvents: (state, action) => {
      state.TableDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
  },
});
export const { setStatisticsData, setChartData, setUpcomingEvents } =
  StatisticSlice.actions;
export default StatisticSlice.reducer;
export const getStatisticsData = (state) => state.statistics?.StatisticsData;
export const getChartData = (state) => state.statistics?.ChartData;
export const getTableDataList = (state) => state.statistics?.TableDataList;
export const getPageData = (state) => state.statistics?.pageData;
