/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RatingsDataList: null,
  ratingsDetail: null,
  pageData: null,
};

export const Rating = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRatingList: (state, action) => {
      const existingIds = new Set(
        state.RatingsDataList?.map((item) => item.id),
      );
      const newData =
        action.payload?.data?.filter((item) => !existingIds.has(item.id)) || [];

      state.RatingsDataList = [...(state.RatingsDataList || []), ...newData];
      state.pageData = action.payload?.meta;
    },
    setRating: (state, action) => {
      state.RatingsDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeRatingList: (state, action) => {
      state.RatingsDataList = null;
    },
    removeRating: (state, action) => {
      state.RatingsDataList.splice(action.payload.index, 1);
    },
  },
});
export const { setRatingList, setRating, removeRatingList, removeRating } =
  Rating.actions;
export default Rating.reducer;
export const getRatingsList = (state) => state.ratings?.RatingsDataList;
export const getPageData = (state) => state.ratings?.pageData;
