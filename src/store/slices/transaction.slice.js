/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TransactionsDataList: null,
  transactionsDetail: null,
  transactionsPageData: null,
};

export const TransactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactionsList: (state, action) => {
      state.TransactionsDataList = action.payload?.data;
      state.transactionsPageData = action.payload?.meta;
    },
    setTransaction: (state, action) => {
      state.TransactionsDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.transactionsPageData.totalPages =
          ((state.transactionsPageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.transactionsPageData.totalItems + 1) / 10) + 1
            : parseInt((state.transactionsPageData.totalItems + 1) / 10);
      }
    },
    removeTransaction: (state, action) => {
      state.TransactionsDataList.splice(action.payload.index, 1);
    },
  },
});
export const { setTransactionsList, setTransaction, removeTransaction } =
  TransactionSlice.actions;
export default TransactionSlice.reducer;
export const getTransactionList = (state) =>
  state.transactions?.TransactionsDataList;
export const transactionPageData = (state) =>
  state.transactions?.transactionsPageData;
