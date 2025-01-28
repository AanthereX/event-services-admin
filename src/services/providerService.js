/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllProviderServices = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllProviderServices({ page, search }),
    method: apiMethod.GET,
  };
};

const providerServiceVisibility = ({ id = "" }) => {
  return {
    url: endpoints.providerServiceVisibility(id),
    method: apiMethod.PATCH,
    body: {},
  };
};

export const ProviderServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProviderServices: build.query({ query: getAllProviderServices }),
    providerServiceVisibility: build.mutation({
      query: providerServiceVisibility,
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllProviderServicesQuery,
  useProviderServiceVisibilityMutation,
} = ProviderServices;
