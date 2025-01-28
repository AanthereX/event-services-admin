/** @format */

import * as yup from "yup";
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from "libphonenumber-js";

const phoneValidation = (value, context) => {
  if (!value) return false;

  const parsedPhoneNumber = parsePhoneNumberFromString(value);
  return !!parsedPhoneNumber?.number
    ? isValidPhoneNumber(parsedPhoneNumber?.number)
    : false;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Required field")
    .matches(
      /^[a-zA-Z0-9](?!.*[.]{2})[a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    ),
  password: yup.string().required("Required field"),
});
const vendorSchema = (isEdit) =>
  yup.object().shape({
    fullName: yup
      .string()
      .required("Required field")
      .test(
        "not-empty",
        "Can't be only spaces",
        (value) => value && value.trim() !== "",
      ),
    phoneNumber: yup.string().optional(),
    // .test("isValidPhone", "Invalid phone number", phoneValidation)
    email: yup
      .string()
      .required("Required field")
      .matches(
        /^[a-zA-Z0-9](?!.*[.]{2})[a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ),
    password: !!isEdit
      ? yup.string().optional()
      : yup.string().required("Required field"),
    confirmPassword: isEdit
      ? yup.string().optional()
      : yup
          .string()
          .required("Required Field")
          .oneOf([yup.ref("password"), null], "Passwords must match"),
    venue: yup.boolean().required("Required field"),
    service: yup.boolean().required("Required field"),
    companyName: yup
      .string()
      .required("Required field")
      .test(
        "not-empty",
        "Can't be only spaces",
        (value) => value && value.trim() !== "",
      ),
    comercialNumber: yup
      .string()
      .required("Required field")
      .test(
        "not-empty",
        "Can't be only spaces",
        (value) => value && value.trim() !== "",
      ),
    venueOrServiceProvider: yup.boolean().optional(),
    // serviceCategory: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       type: yup
    //         .string()
    //         .oneOf(["add", "edit", "delete"], "Invalid type")
    //         .required("Type is required"),
    //       serviceCategoryId: yup
    //         .string()
    //         .required("Service category Id is required"),
    //       companyServiceId: yup.string().optional(),
    //     }),
    //   )
    //   .required("Service categories are required"),
  });
const addEditUserSchema = (isEdit) =>
  yup.object().shape({
    fullName: yup
      .string()
      .required("Required field")
      .test(
        "not-empty",
        "Can't be only spaces",
        (value) => value && value.trim() !== "",
      ),
    phoneNumber: yup.string().optional(),
    // .test("isValidPhone", "Invalid phone number", phoneValidation)
    email: yup
      .string()
      .required("Required field")
      .matches(
        /^[a-zA-Z0-9](?!.*[.]{2})[a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ),
    password: isEdit
      ? yup.string().optional()
      : yup.string().required("Required field"),
    confirmPassword: isEdit
      ? yup.string().optional()
      : yup
          .string()
          .required("Required Field")
          .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
const addEditVenueFacilitySchema = yup.object().shape({
  facilityNameEn: yup
    .string()
    .required("Required field")
    .test(
      "not-empty",
      "Can't be only spaces",
      (value) => value && value.trim() !== "",
    ),
  facilityNameAr: yup
    .string()
    .required("Required field")
    .test(
      "not-empty",
      "Can't be only spaces",
      (value) => value && value.trim() !== "",
    ),
});
const addEditServiceCategorySchema = yup.object().shape({
  categoryNameEn: yup
    .string()
    .required("Required field")
    .test(
      "not-empty",
      "Can't be only spaces",
      (value) => value && value.trim() !== "",
    ),
  categoryNameAr: yup
    .string()
    .required("Required field")
    .test(
      "not-empty",
      "Can't be only spaces",
      (value) => value && value.trim() !== "",
    ),
});
const changePasswordValidationSchema = yup.object().shape({
  newPassword: yup.string().required("Required Field"),
  confirmNewPassword: yup
    .string()
    .required("Required Field")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export {
  loginSchema,
  changePasswordValidationSchema,
  vendorSchema,
  addEditUserSchema,
  addEditVenueFacilitySchema,
  addEditServiceCategorySchema,
};
