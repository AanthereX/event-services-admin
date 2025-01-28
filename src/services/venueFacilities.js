/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllFacilities = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllFacilities({ page, search }),
    method: apiMethod.GET,
  };
};

const facilityVisibility = ({ id = "" }) => {
  return {
    url: endpoints.facilityVisibility(id),
    method: apiMethod.PATCH,
    body: {},
  };
};

const updateVenueFacility = ({ id = "", body = null }) => {
  return {
    url: endpoints.updateVenueFacility(id),
    method: apiMethod.PATCH,
    body,
  };
};

const addVenueFacility = (body) => {
  return {
    url: endpoints.addVenueFacility(),
    method: apiMethod.POST,
    body,
  };
};

export const VenuesFacilities = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFacilities: build.query({ query: getAllFacilities }),
    facilityVisibility: build.mutation({
      query: facilityVisibility,
    }),
    updateVenueFacility: build.mutation({ query: updateVenueFacility }),
    addVenueFacility: build.mutation({ query: addVenueFacility }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllFacilitiesQuery,
  useAddVenueFacilityMutation,
  useFacilityVisibilityMutation,
  useUpdateVenueFacilityMutation,
} = VenuesFacilities;
