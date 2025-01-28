/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ReviewsDataList: null,
  reviewsDetail: null,
  pageData: null,
};

export const RatingAndReviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviewList: (state, action) => {
      state.ReviewsDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setReview: (state, action) => {
      state.ReviewsDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeReview: (state, action) => {
      state.ReviewsDataList.splice(action.payload.index, 1);
    },
  },
});
export const { setReviewList, setReview, removeReview } =
  RatingAndReviewSlice.actions;
export default RatingAndReviewSlice.reducer;
export const getReviewsList = (state) => state.reviews?.ReviewsDataList;
export const getPageData = (state) => state.reviews?.pageData;
