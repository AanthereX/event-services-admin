/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getUsers = ({ page = 1, search = "" }) => {
  return {
    url: endpoints.getAllUsers({ page, search }),
    method: apiMethod.GET,
  };
};

const getUserById = ({ id = "" }) => {
  return {
    url: endpoints.getUserDetailById(id),
    method: apiMethod.GET,
  };
};

const getUsersEventsById = ({ page = 1, id = "" }) => {
  return {
    url: endpoints.getUserEventsById({ page, id }),
    method: apiMethod.GET,
  };
};

const getUserInvitationsById = ({ page = 1, id = "" }) => {
  return {
    url: endpoints.getUserInvitationsById({ page, id }),
    method: apiMethod.GET,
  };
};

const updateUser = ({ id = "", body = null }) => {
  return {
    url: endpoints.updateUser(id),
    method: apiMethod.PATCH,
    body,
  };
};

const userVisibility = ({ id = "" }) => {
  return {
    url: endpoints.userVisibility(id),
    method: apiMethod.PATCH,
    body: {},
  };
};

const addUser = (body) => {
  return {
    url: endpoints.addUser(),
    method: apiMethod.POST,
    body,
  };
};

export const Users = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({ query: getUsers }),
    updateUser: build.mutation({ query: updateUser }),
    userVisibility: build.mutation({ query: userVisibility }),
    addUser: build.mutation({ query: addUser }),
    getUserById: build.query({ query: getUserById }),
    getUserEventsById: build.query({ query: getUsersEventsById }),
    getUserInvitationsById: build.query({ query: getUserInvitationsById }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useUserVisibilityMutation,
  useLazyGetUserByIdQuery,
  useLazyGetUserInvitationsByIdQuery,
  useLazyGetUserEventsByIdQuery,
} = Users;
