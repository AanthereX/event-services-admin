/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllServiceCategory = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllServiceCategory({ page, search }),
    method: apiMethod.GET,
  };
};

const serviceCategoryVisibility = ({ id = "" }) => {
  return {
    url: endpoints.serviceCategoryVisibility(id),
    method: apiMethod.PATCH,
    body: {},
  };
};

const updateServiceCategory = ({ id = "", body = null }) => {
  return {
    url: endpoints.updateCategoryById(id),
    method: apiMethod.PATCH,
    body,
  };
};

const addServiceCategory = (body) => {
  return {
    url: endpoints.addCategory(),
    method: apiMethod.POST,
    body,
  };
};

export const ServiceCategories = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllServiceCategory: build.query({ query: getAllServiceCategory }),
    serviceCategoryVisibility: build.mutation({
      query: serviceCategoryVisibility,
    }),
    updateServiceCategory: build.mutation({ query: updateServiceCategory }),
    addServiceCategory: build.mutation({ query: addServiceCategory }),
    // getAllServiceCategory: build.query({ query: getAllServiceCategories }),
    // updateVendorStatus: build.mutation({ query: updateVendorStatus }),
    // updateVendorStatus: build.mutation({ query: updateVendorStatus }),
    // getVendorById: build.query({ query: getVendorById }),
    // getVendorVenuesById: build.query({ query: getVendorVenuesById }),
    // getVendorServicesById: build.query({ query: getVendorServicesById }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllServiceCategoryQuery,
  useServiceCategoryVisibilityMutation,
  useAddServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
} = ServiceCategories;
