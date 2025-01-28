/** @format */

import { createSlice } from "@reduxjs/toolkit";
import labels from "../../locale";
import { calculatePercentageChange } from "../../utils";

const initialState = {
  DashboardData: [
    {
      id: 1,
      title: labels.totalEvents,
      count: 0,
      value: "",
      isProfit: null,
      bgColor: "bg-c_E3F5FF",
    },
    {
      id: 2,
      title: labels.totalUsers,
      count: 0,
      value: "",
      isProfit: null,
      bgColor: "bg-c_E5ECF6",
    },
    {
      id: 3,
      title: labels.totalVendors,
      count: 0,
      value: "",
      isProfit: null,
      bgColor: "bg-c_E3F5FF",
    },
    {
      id: 4,
      title: labels.pendingRequests,
      count: 0,
      value: "11.02",
      isProfit: null,
      bgColor: "bg-c_E5ECF6",
    },
  ],
  ChartData: null,
  UpcomingEventsDataList: null,
  pageData: null,
};

export const DashboardSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      const apiData = action.payload?.data;
      // console.log(apiData, "apiData");
      state.DashboardData = state.DashboardData.map((item) => {
        switch (item.title) {
          case labels.totalEvents || "total events":
            return {
              ...item,
              count: apiData.totalEvents,
              isProfit:
                apiData.currentWeekTotalEvent > apiData.previousWeekEvents,
              value: calculatePercentageChange(
                apiData.previousWeekEvents,
                apiData.currentWeekTotalEvent,
              ),
            };
          case labels.totalUsers || "total users":
            return {
              ...item,
              count: apiData.totalUser,
              isProfit: apiData.currentWeekTotalUser > apiData.previousWeekUser,
              value: calculatePercentageChange(
                apiData.previousWeekUser,
                apiData.currentWeekTotalUser,
              ),
            };
          case labels.totalVendors || "total vendors":
            return {
              ...item,
              count: apiData.totalVendor,
              isProfit: apiData.currentWeekVendor > apiData.pastWeekVendor,
              value: calculatePercentageChange(
                apiData.pastWeekVendor,
                apiData.currentWeekVendor,
              ),
            };
          case labels.pendingRequests || "pending requests":
            return {
              ...item,
              count: 120,
              isProfit: null,
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
      state.UpcomingEventsDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
  },
});
export const { setDashboardData, setChartData, setUpcomingEvents } =
  DashboardSlice.actions;
export default DashboardSlice.reducer;
export const getDashboardData = (state) => state.dashboardData?.DashboardData;
export const getChartData = (state) => state.dashboardData?.ChartData;
export const getUpcomingEventDataList = (state) =>
  state.dashboardData?.UpcomingEventsDataList;
export const getPageData = (state) => state.dashboardData?.pageData;
