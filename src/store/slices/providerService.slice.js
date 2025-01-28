/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ProviderServiceDataList: null,
  providerServiceDetail: null,
  pageData: null,
};

export const ProviderServiceSlice = createSlice({
  name: "providerservice",
  initialState,
  reducers: {
    setProviderServiceList: (state, action) => {
      state.ProviderServiceDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setProviderService: (state, action) => {
      state.ProviderServiceDataList[action.payload.index] =
        action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeProviderService: (state, action) => {
      state.ProviderServiceDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setProviderServiceList,
  setProviderService,
  removeProviderService,
} = ProviderServiceSlice.actions;
export default ProviderServiceSlice.reducer;
export const getServiceProviderList = (state) =>
  state.providerservice?.ProviderServiceDataList;
export const getPageData = (state) => state.providerservice?.pageData;
