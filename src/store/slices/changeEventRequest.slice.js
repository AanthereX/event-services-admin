/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ChangeEventRequestDataList: null,
  changeEventRequestDetails: null,
  pageData: null,
};

export const ChangeEventRequestSlice = createSlice({
  name: "changeEventRequests",
  initialState,
  reducers: {
    setChangeEventRequestList: (state, action) => {
      state.ChangeEventRequestDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setChangeEventRequest: (state, action) => {
      state.ChangeEventRequestDataList[action.payload.index] =
        action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeChangeEventRequest: (state, action) => {
      state.ChangeEventRequestDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setChangeEventRequestList,
  setChangeEventRequest,
  removeChangeEventRequest,
} = ChangeEventRequestSlice.actions;
export default ChangeEventRequestSlice.reducer;
export const getChangeEventRequestList = (state) =>
  state.changeEventRequests?.ChangeEventRequestDataList;
export const getPageData = (state) => state.changeEventRequests?.pageData;
