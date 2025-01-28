/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllReviews = ({ page = 1, search = "", type = "" }) => {
  return {
    url: endpoints.getReviewsByType({ page, search, type }),
    method: apiMethod.GET,
  };
};

export const VenuesFacilities = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReviews: build.query({ query: getAllReviews }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllReviewsQuery } = VenuesFacilities;
