/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RequestDataList: null,
  requestDetail: null,
  pageData: null,
};

export const RequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequestList: (state, action) => {
      state.RequestDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setRequest: (state, action) => {
      state.RequestDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeRequest: (state, action) => {
      state.RequestDataList.splice(action.payload.index, 1);
    },
  },
});
export const { setRequestList, setRequest, removeRequest } =
  RequestSlice.actions;
export default RequestSlice.reducer;
export const getRequestList = (state) => state.request?.RequestDataList;
export const getPageData = (state) => state.request?.pageData;
