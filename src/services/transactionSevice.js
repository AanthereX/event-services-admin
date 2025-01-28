/** @format */

import { endpoints } from "../constants/endpoints.constants";
import { apiMethod } from "../constants/api-methods.constants";
import baseApi from "./api";

const getAllTransactions = ({ page = 1, id = "", payment = "" }) => {
  console.log(payment, "payment");
  return {
    url: endpoints.getAllTransactions({ page, id, payment }),
    method: apiMethod.GET,
  };
};

export const Transactions = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTransactions: build.query({ query: getAllTransactions }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllTransactionsQuery } = Transactions;
