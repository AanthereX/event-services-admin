/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvitationDataList: null,
  invitationDetail: null,
  pageData: null,
  MonetaryGiftsList: null,
  pageDataMonetaryGifts: null,
};

export const InvitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    setInvitationList: (state, action) => {
      const existingIds = new Set(
        state.InvitationDataList?.map((item) => item?.invitation_id),
      );
      const newData =
        action.payload?.data?.filter(
          (item) => !existingIds.has(item?.invitation_id),
        ) || [];

      state.InvitationDataList = [
        ...(state.InvitationDataList || []),
        ...newData,
      ];
      state.pageData = action.payload?.meta;
    },
    setMonetaryGiftsList: (state, action) => {
      console.log(action.payload?.data, "action.payload?.data");
      const existingIds = new Set(
        state.MonetaryGiftsList?.map((item) => item?.id),
      );
      const newData =
        action.payload?.data?.filter((item) => !existingIds.has(item?.id)) ||
        [];

      state.MonetaryGiftsList = [
        ...(state.MonetaryGiftsList || []),
        ...newData,
      ];
      state.pageDataMonetaryGifts = action.payload?.meta;
    },
    setInvitation: (state, action) => {
      state.InvitationDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeInvitationsList: (state, action) => {
      state.InvitationDataList = null;
    },
    removeMonetaryGiftsList: (state, action) => {
      state.MonetaryGiftsList = null;
    },
    removeInvitation: (state, action) => {
      state.InvitationDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setInvitationList,
  removeInvitationsList,
  setInvitation,
  removeInvitation,
  setMonetaryGiftsList,
  removeMonetaryGiftsList,
} = InvitationSlice.actions;
export default InvitationSlice.reducer;
export const getInvitationList = (state) =>
  state.invitation?.InvitationDataList;
export const getMonetaryGiftsList = (state) =>
  state.invitation?.MonetaryGiftsList;
export const getPageData = (state) => state.invitation?.pageData;
export const getMonetaryGiftPageData = (state) =>
  state.invitation?.pageDataMonetaryGifts;
