/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getVendors = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllVendors({ page, search }),
    method: apiMethod.GET,
  };
};

const getAllServiceCategories = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllServiceCategory({ page, search }),
    method: apiMethod.GET,
  };
};

const getAllServiceWithoutPagination = () => {
  return {
    url: endpoints.getAllServiceCategoryWithoutPage(),
    method: apiMethod.GET,
  };
};

const getVendorById = ({ id = "" }) => {
  return {
    url: endpoints.getVendorDetailById(id),
    method: apiMethod.GET,
  };
};

const getVendorVenuesById = ({ page = 1, id = "" }) => {
  return {
    url: endpoints.getVendorVenuesById({ page, id }),
    method: apiMethod.GET,
  };
};

const getVendorServicesById = ({ page = 1, id = "" }) => {
  return {
    url: endpoints.getVendorServicesById({ page, id }),
    method: apiMethod.GET,
  };
};

const updateVendors = ({ id = "", body = null }) => {
  return {
    url: endpoints.updateVendor(id),
    method: apiMethod.PATCH,
    body,
  };
};

const updateVendorStatus = ({ id = "", body = null }) => {
  return {
    url: endpoints.updateVendorStatus(id),
    method: apiMethod.PATCH,
    body,
  };
};

const vendorVisibility = ({ id = "" }) => {
  return {
    url: endpoints.vendorVisibility(id),
    method: apiMethod.PATCH,
    body: {},
  };
};

const addVendor = (body) => {
  return {
    url: endpoints.addVendor(),
    method: apiMethod.POST,
    body,
  };
};

export const Vendors = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getVendors: build.query({ query: getVendors }),
    updateVendors: build.mutation({ query: updateVendors }),
    vendorVisibility: build.mutation({ query: vendorVisibility }),
    addVendor: build.mutation({ query: addVendor }),
    getAllServiceCategory: build.query({ query: getAllServiceCategories }),
    updateVendorStatus: build.mutation({ query: updateVendorStatus }),
    updateVendorStatus: build.mutation({ query: updateVendorStatus }),
    getVendorById: build.query({ query: getVendorById }),
    getVendorVenuesById: build.query({ query: getVendorVenuesById }),
    getVendorServicesById: build.query({ query: getVendorServicesById }),
    getAllServiceWithoutPagination: build.query({
      query: getAllServiceWithoutPagination,
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetVendorsQuery,
  useAddVendorMutation,
  useUpdateVendorsMutation,
  useVendorVisibilityMutation,
  useLazyGetAllServiceCategoryQuery,
  useUpdateVendorStatusMutation,
  useLazyGetVendorByIdQuery,
  useLazyGetVendorVenuesByIdQuery,
  useLazyGetVendorServicesByIdQuery,
  useLazyGetAllServiceWithoutPaginationQuery,
} = Vendors;
