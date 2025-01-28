/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EventDataList: null,
  eventsDetail: null,
  pageData: null,
};

export const EventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventList: (state, action) => {
      state.EventDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setEvent: (state, action) => {
      state.EventDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeEvent: (state, action) => {
      state.EventDataList.splice(action.payload.index, 1);
    },
  },
});
export const { setEventList, setEvent, removeEvent } = EventSlice.actions;
export default EventSlice.reducer;
export const getEventList = (state) => state.events?.EventDataList;
export const getPageData = (state) => state.events?.pageData;
