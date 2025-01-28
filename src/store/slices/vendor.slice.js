/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VendorDataList: null,
  vendorDetail: null,
  pageData: null,
  ServiceCategories: null,
};

export const VendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorList: (state, action) => {
      state.VendorDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setServiceCategoriesList: (state, action) => {
      state.ServiceCategories = action.payload?.data;
      // state.pageData = action.payload?.meta;
    },
    setVendor: (state, action) => {
      state.VendorDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeVendor: (state, action) => {
      state.VendorDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setVendorList,
  setVendor,
  removeVendor,
  setServiceCategoriesList,
} = VendorSlice.actions;
export default VendorSlice.reducer;
export const getVendorList = (state) => state.vendor?.VendorDataList;
export const getAllServiceCategoriesList = (state) =>
  state.vendor?.ServiceCategories;
export const getPageData = (state) => state.vendor?.pageData;
