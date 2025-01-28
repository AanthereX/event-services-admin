/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllVenues = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllVenues({ page, search }),
    method: apiMethod.GET,
  };
};

const venueVisibility = ({ id = "" }) => {
  return {
    url: endpoints.venueVisibility(id),
    method: apiMethod.PATCH,
    body: {},
  };
};

const getVenuesDetailById = ({ id = "" }) => {
  return {
    url: endpoints.getVenueDetailById(id),
    method: apiMethod.GET,
  };
};

const getVenueReviewsById = ({ id = "", page = 1 }) => {
  return {
    url: endpoints.getVenueReviewsById({ id, page }),
    method: apiMethod.GET,
  };
};

const getServiceReviewsById = ({ id = "", page = 1 }) => {
  return {
    url: endpoints.getServiceReviewsById({ id, page }),
    method: apiMethod.GET,
  };
};

const getVenueAvailabilities = ({ id = "", startDate = "", endDate = "" }) => {
  return {
    url: endpoints.getVenueAvailabilitiesById({
      id,
      startDate,
      endDate,
    }),
    method: apiMethod.GET,
  };
};

const getBookingDetailsById = ({ id = "" }) => {
  return {
    url: endpoints.getBookingDetailsByAvailabilityId(id),
    method: apiMethod.GET,
  };
};

export const VenuesFacilities = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVenues: build.query({ query: getAllVenues }),
    getVenueReviewsById: build.query({ query: getVenueReviewsById }),
    getServiceReviewsById: build.query({ query: getServiceReviewsById }),
    venueVisibility: build.mutation({
      query: venueVisibility,
    }),
    getVenuesDetailById: build.query({ query: getVenuesDetailById }),
    getVenueAvailabilities: build.query({ query: getVenueAvailabilities }),
    getBookingDetailsById: build.query({ query: getBookingDetailsById }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllVenuesQuery,
  useVenueVisibilityMutation,
  useLazyGetVenuesDetailByIdQuery,
  useLazyGetVenueReviewsByIdQuery,
  useLazyGetVenueAvailabilitiesQuery,
  useLazyGetServiceReviewsByIdQuery,
  useLazyGetBookingDetailsByIdQuery,
} = VenuesFacilities;
