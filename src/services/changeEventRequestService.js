/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllChangeEventRequest = ({ page = 1 }) => {
  return {
    url: endpoints.getAllChangeEventRequest({ page }),
    method: apiMethod.GET,
  };
};

const changeEventRequestDetailById = (id) => {
  return {
    url: endpoints.changeEventRequestDetailById(id),
    method: apiMethod.GET,
  };
};

export const ChangeEventRequest = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllChangeEventRequest: build.query({ query: getAllChangeEventRequest }),
    changeEventRequestDetailById: build.query({
      query: changeEventRequestDetailById,
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllChangeEventRequestQuery,
  useLazyChangeEventRequestDetailByIdQuery,
} = ChangeEventRequest;
