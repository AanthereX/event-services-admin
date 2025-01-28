/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllStatisticsData = () => {
  return {
    url: endpoints.getAllStatisticsData(),
    method: apiMethod.GET,
  };
};

export const Statistics = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStatisticsData: build.query({ query: getAllStatisticsData }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllStatisticsDataQuery } = Statistics;
