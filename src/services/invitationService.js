/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllInvitations = ({ page = 1 }) => {
  return {
    url: endpoints.getAllInvitations({ page }),
    method: apiMethod.GET,
  };
};

const getEventInvitationInvitees = ({ page = 1, id = "" }) => {
  return {
    url: endpoints.getEventInvitationInvitees({ page, id }),
    method: apiMethod.GET,
  };
};

const getInvitationMonetaryGifts = ({ page = 1, id = "" }) => {
  return {
    url: endpoints.getInvitationMonetaryGiftsById({ page, id }),
    method: apiMethod.GET,
  };
};

export const Invitations = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllInvitations: build.query({ query: getAllInvitations }),
    getInvitationMonetaryGifts: build.query({
      query: getInvitationMonetaryGifts,
    }),
    getEventInvitationInvitees: build.query({
      query: getEventInvitationInvitees,
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllInvitationsQuery,
  useLazyGetEventInvitationInviteesQuery,
  useLazyGetInvitationMonetaryGiftsQuery,
} = Invitations;
