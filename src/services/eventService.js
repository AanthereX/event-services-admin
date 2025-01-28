/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllEvents = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllEvents({ page, search }),
    method: apiMethod.GET,
  };
};

const getEventDetailById = ({ id = "" }) => {
  return {
    url: endpoints.getEventDetailById(id),
    method: apiMethod.GET,
  };
};

const getServiceDetailById = (id) => {
  return {
    url: endpoints.getServiceDetailsById(id),
    method: apiMethod.GET,
  };
};

const getServiceRequestListById = ({ page = 1, id = "" }) => {
  return {
    url: endpoints.getServiceRequestListById({ page, id }),
    method: apiMethod.GET,
  };
};

const getEventServiceRequests = ({ page = 1 }) => {
  return {
    url: endpoints.getEventServiceRequests({ page }),
    method: apiMethod.GET,
  };
};

const eventVisibility = ({ id = "" }) => {
  return {
    url: endpoints.eventVisibility(id),
    method: apiMethod.PATCH,
    body: {},
  };
};

export const Events = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEvents: build.query({ query: getAllEvents }),
    getServiceRequestListById: build.query({
      query: getServiceRequestListById,
    }),
    getEventServiceRequests: build.query({ query: getEventServiceRequests }),
    getServiceDetailById: build.query({ query: getServiceDetailById }),
    getEventDetailById: build.query({ query: getEventDetailById }),
    eventVisibility: build.mutation({ query: eventVisibility }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllEventsQuery,
  useLazyGetEventServiceRequestsQuery,
  useLazyGetServiceRequestListByIdQuery,
  useLazyGetEventDetailByIdQuery,
  useEventVisibilityMutation,
  useLazyGetServiceDetailByIdQuery,
} = Events;
