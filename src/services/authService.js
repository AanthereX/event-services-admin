/** @format */

import { endpoints } from "../constants/endpoints.constants.js";
import { apiMethod } from "../constants/api-methods.constants.js";
import baseApi from "./api";

/**
 * Creates a login request object with the given body.
 *
 * @param {Object} body - The request body containing the login credentials.
 * @return {Object} An object containing the URL, method, and body for the login request.
 */
const login = (body) => {
  return {
    url: endpoints.login(),
    method: apiMethod.POST,
    body,
  };
};

const forgetPassword = (body) => {
  return {
    url: endpoints.forgetPassword(),
    method: apiMethod.POST,
    body,
  };
};

export const Auth = baseApi.injectEndpoints({
  /**
   * Returns an object containing mutation endpoints for login, signup, upload file, and check email.
   *
   * @param {function} build - A function that returns an object with mutation endpoints.
   * @return {object} An object with mutation endpoints for login, signup, upload file, and check email.
   */
  endpoints: (build) => ({
    login: build.mutation({ query: login }),
    forgetPassword: build.mutation({ query: forgetPassword }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useForgetPasswordMutation } = Auth;
