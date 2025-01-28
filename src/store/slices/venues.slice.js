/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VenuesDataList: null,
  venuesDetail: null,
  pageData: null,
  Venues: null,
};

export const Venues = createSlice({
  name: "venues",
  initialState,
  reducers: {
    setVenuesList: (state, action) => {
      state.VenuesDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setVenues: (state, action) => {
      state.VenuesDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeVenue: (state, action) => {
      state.VenuesDataList.splice(action.payload.index, 1);
    },
  },
});
export const { setVenuesList, setVenues, removeVenue } = Venues.actions;
export default Venues.reducer;
export const getVenuesList = (state) => state.venues?.VenuesDataList;
export const getAllVenuesList = (state) => state.venues?.Venues;
export const getPageData = (state) => state.venues?.pageData;
