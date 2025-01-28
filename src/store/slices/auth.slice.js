/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  headers: null,
  userDetail: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Updates the login data in the state with the provided token and user details.
     *
     * @param {Object} state - The current state object.
     * @param {Object} action - The action object containing the payload.
     * @param {string} action.payload.token - The token to update the state with.
     * @param {Object} action.payload.user - The user details to update the state with.
     * @return {void} This function does not return anything.
     */
    setLoginData: (state, action) => {
      state.token = action.payload.token;
      state.userDetail = action.payload.user;
    },
    /**
     * Removes the login data from the state.
     *
     * @param {Object} state - The current state object.
     * @return {void} This function does not return anything.
     */
    removeLoginData: (state) => {
      state.token = null;
      state.userDetail = null;
    },

    /**
     * Updates the headers in the state with the new key-value pair from the action payload.
     *
     * @param {Object} state - The current state object.
     * @param {Object} action - The action object containing the payload.
     * @param {string} action.payload.key - The key for the new header.
     * @param {string} action.payload.value - The value for the new header.
     * @return {void} This function does not return anything.
     */
    addHeader: (state, action) => {
      state.headers = {
        ...state.headers,
        [action.payload.key]: action.payload.value,
      };
    },
    /**
     * Removes a header from the state if it exists.
     *
     * @param {Object} state - The current state object.
     * @param {Object} action - The action object containing the payload.
     * @return {void} This function does not return anything.
     */
    removeHeader: (state, action) => {
      if (state.headers && Object.keys(state.headers).length > 0) {
        delete state.headers[action.payload];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginData, removeLoginData, addHeader, removeHeader } =
  authSlice.actions;

export default authSlice.reducer;

export const getUserData = (state) => state?.auth?.userDetail;
export const getToken = (state) => state?.auth?.token;
