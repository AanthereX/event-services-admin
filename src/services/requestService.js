/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllServiceRequests = ({ page = 1, search = "", type = "" }) => {
  return {
    url: endpoints.getAllServiceRequests({ page, search, type }),
    method: apiMethod.GET,
  };
};

const updateRequestStatus = ({ id = "", body = null }) => {
  return {
    url: endpoints.updateRequestStatusById(id),
    method: apiMethod.PATCH,
    body,
  };
};

export const ServiceRequest = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllServiceRequests: build.query({ query: getAllServiceRequests }),
    updateRequestStatus: build.mutation({ query: updateRequestStatus }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllServiceRequestsQuery,
  useUpdateRequestStatusMutation,
} = ServiceRequest;
