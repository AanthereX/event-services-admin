/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VenueFacilityDataList: null,
  venueFacilityDetail: null,
  pageData: null,
  VenueFacilities: null,
};

export const VenueFacilitySlice = createSlice({
  name: "venueFacility",
  initialState,
  reducers: {
    setVenueFacilityList: (state, action) => {
      state.VenueFacilityDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setVenueFacilitiesList: (state, action) => {
      state.VenueFacilities = action.payload?.data;
      // state.pageData = action.payload?.meta;
    },
    setVenueFacility: (state, action) => {
      state.VenueFacilityDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeVenueFacility: (state, action) => {
      state.VenueFacilityDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setVenueFacilityList,
  setVenueFacility,
  removeVenueFacility,
  setVenueFacilitiesList,
} = VenueFacilitySlice.actions;
export default VenueFacilitySlice.reducer;
export const getVenueFacilityList = (state) =>
  state.venueFacility?.VenueFacilityDataList;
export const getAllVenueFacilitiesList = (state) =>
  state.venueFacility?.VenueFacilities;
export const getPageData = (state) => state.venueFacility?.pageData;
