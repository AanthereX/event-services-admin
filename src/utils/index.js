/** @format */

import moment from "moment";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

// utility function for setting data in LS
export const setLocalStorageData = (key, value) => {
  typeof value === "object"
    ? localStorage.setItem(key, JSON.stringify(value))
    : localStorage.setItem(key, value);
};

// utility function for getting data from LS
export const getLocalStorageData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return localStorage.getItem(key);
  }
};

// function to return "YES" or "NO" depending on param passed
export const returnYesOrNo = (value) => {
  return !!value ? "Yes" : "No";
};

// utility function for removing data from LS
export const removeLocalStorageData = (key) => {
  localStorage.removeItem(key);
};

export const kFormatter = (num) => {
  const value = Number(num);
  if (value >= 1000) {
    const formatted = (value / 1000).toFixed(1);
    return formatted.endsWith(".0")
      ? `${formatted?.slice(0, -2) + "k"}`
      : formatted + "k";
  } else {
    return value?.toString();
  }
};

export const formatNumberToUSLocale = (num) => {
  const value = Number(num);
  return new Intl.NumberFormat("en-US").format(value);
};

export const getDateBasedOnTab = (selectedTab) => {
  const format = "DD MMMM YYYY"; // Desired date format
  const yearlyFormat = "YYYY"; // Desired year format
  const monthlyFormat = "MMMM"; // Desired monthly format
  const today = moment(); // Current date

  if (selectedTab === "yearly") {
    return `${today.subtract(5, "years").format(yearlyFormat)} - ${today.format(
      yearlyFormat,
    )}`;
  } else if (selectedTab === "weekly") {
    const weekStart = today.clone().subtract(7, "days");
    return `${weekStart.format(format)} - ${today.format(format)}`;
  } else if (selectedTab === "monthly") {
    const monthStart = today.clone().subtract(30, "days");
    return `${monthStart.format(monthlyFormat)} - ${today.format(
      monthlyFormat,
    )}`;
  }

  return null;
};

/**
 * Calculate the percentage of increase or decrease between two numbers.
 *
 * @param {number} previous - The previous value.
 * @param {number} current - The current value.
 * @returns {string} - The percentage with a "+" or "-" sign.
 */
export const calculatePercentageChange = (previous, current) => {
  if (previous === 0 && current === 0) return "0.00%"; // if both are 0
  if (previous === 0) return "+100.0%"; // If no previous value but there's a current value
  if (current === 0) return "-100.0%"; // If there's a previous value but no current value

  const percentageChange = ((current - previous) / previous) * 100;
  return `${percentageChange > 0 ? "+" : ""}${percentageChange.toFixed(1)} %`;
};

export const checkRequestServiceStatus = (status, labels) => {
  if (["pending", "underReview"].includes(status)) {
    return `${labels.pending}`;
  } else if (["cancelled", "declined", "rejected"].includes(status)) {
    return `${labels.declined}`;
  } else if (["accepted", "approved"].includes(status)) {
    return `${labels.accepted}`;
  } else {
    return ``;
  }
};

export const checkTransactionsStatus = (status, labels) => {
  if (["pending", "underReview"].includes(status)) {
    return `${labels.pending}`;
  } else if (["cancelled", "declined", "rejected"].includes(status)) {
    return `${labels.declined}`;
  } else if (["completed"].includes(status)) {
    return `${labels.completed}`;
  } else if (["downPayment", "down"].includes(status)) {
    return `${labels.downPayment}`;
  } else if (["remainingPayment", "remaining"].includes(status)) {
    return `${labels.remainingPayment}`;
  } else if (["partial", "partialPayment"].includes(status)) {
    return `${labels.partialPayment}`;
  } else if (["full", "fullPayment"].includes(status)) {
    return `${labels.fullPayment}`;
  } else {
    return ``;
  }
};

export const returnStatusColor = (status) => {
  if (
    ["pending", "underReview", "partial", "partialPayment"].includes(status)
  ) {
    return `!text-c_FF9500`;
  } else if (
    [
      "cancelled",
      "declined",
      "notInterested",
      "Not Interested",
      "rejected",
    ].includes(status)
  ) {
    return `!text-c_EF394A`;
  } else if (
    ["accepted", "approved", "completed", "Interested", "interested"].includes(
      status,
    )
  ) {
    return `!text-c_34C759`;
  } else if (["down", "downPayment"].includes(status)) {
    return `!text-c_2D68FC`;
  } else if (["remaining", "remainingPayment"].includes(status)) {
    return `!text-c_0C98BF`;
  } else if (["full", "fullPayment"].includes(status)) {
    return `!text-c_34C759`;
  } else {
    return `text-c_202224`;
  }
};
