/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CategoriesDataList: null,
  serviceCategoriesDetail: null,
  pageData: null,
  ServiceCategories: null,
};

export const ServiceCategoriesSlice = createSlice({
  name: "serviceCategories",
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.CategoriesDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setServiceCategoriesList: (state, action) => {
      state.ServiceCategories = action.payload?.data;
      // state.pageData = action.payload?.meta;
    },
    setCategory: (state, action) => {
      state.CategoriesDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeCategory: (state, action) => {
      state.CategoriesDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setCategoryList,
  setCategory,
  removeCategory,
  setServiceCategoriesList,
} = ServiceCategoriesSlice.actions;
export default ServiceCategoriesSlice.reducer;
export const getCategoryList = (state) =>
  state.serviceCategories?.CategoriesDataList;
export const getAllServiceCategoriesList = (state) =>
  state.serviceCategories?.ServiceCategories;
export const getPageData = (state) => state.serviceCategories?.pageData;
