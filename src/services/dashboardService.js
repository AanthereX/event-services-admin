/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllDashboardData = ({ type = "", filter = "" }) => {
  return {
    url: endpoints.getAllDashboardData({ type, filter }),
    method: apiMethod.GET,
  };
};

const getAllUpcomingEvents = ({ page = 1 }) => {
  return {
    url: endpoints.getAllUpcomingEvents({ page }),
    method: apiMethod.GET,
  };
};

export const Dashboard = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDashboardData: build.query({ query: getAllDashboardData }),
    getAllUpcomingEvents: build.query({ query: getAllUpcomingEvents }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllDashboardDataQuery,
  useLazyGetAllUpcomingEventsQuery,
} = Dashboard;
