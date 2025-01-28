/** @format */

import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { vendorSchema } from "../../../../utils/validate";
import { useForm } from "react-hook-form";
import { Icons } from "../../../../assets/icons";
import labels from "../../../../locale";
import { Controller } from "react-hook-form";
import Input from "../../../atoms/input";
import PasswordInput from "../../passwordInput";
import Button from "../../../atoms/button";
import { useNavigate } from "react-router-dom";
import RadioButton from "../../../atoms/radioButton";
import PhoneNumberInput from "../../../atoms/phoneNumberInput";
import CheckBox from "../../../atoms/checkBox";
import { useDispatch } from "react-redux";
import { setServiceCategoriesList } from "../../../../store/slices/vendor.slice";
import Image from "../../../atoms/image";
import Paragraph from "../../../atoms/paragraph";
import { toast } from "sonner";

const AddVendorForm = ({
  isEdit = false,
  editVendorObj = {},
  loading,
  onSubmission = () => {},
  servicesData = [],
  setServicesData = () => {},
  isVendorProviderOrService = null,
  setIsVendorProviderOrService = () => {},
  allCheckBoxError = false,
  setAllCheckBoxError = () => {},
}) => {
  const { InfoIconWarningYellow } = Icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    setValue,
    control,
    clearErrors,
    setError,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(vendorSchema(isEdit)),
    defaultValues: {
      fullName: editVendorObj?.fullName || "",
      email: editVendorObj?.email || "",
      password: editVendorObj?.password || "",
      phoneNumber: editVendorObj?.phoneNumber || "",
      venue: editVendorObj?.company?.find((val) => val)?.venue || "",
      service: editVendorObj?.company?.find((val) => val)?.service || "",
      companyName: editVendorObj?.company?.find((val) => val)?.name || "",
      comercialNumber:
        editVendorObj?.company?.find((val) => val)?.commercialNumber || "",
      serviceCategory:
        editVendorObj?.company?.find((val) => val)?.companyService || [],
    },
  });

  useEffect(() => {
    if (!!isEdit) {
      const companyServices =
        editVendorObj?.company?.find((val) => val)?.companyService || [];
      const serviceCategoryIds = companyServices.map(
        (item) => item?.category?.id,
      );

      const updatedServicesData = servicesData?.map((service) => {
        const matchedService = companyServices.find(
          (elm) => elm?.category?.id === service.id,
        );

        return {
          ...service,
          isChecked: serviceCategoryIds.includes(service.id),
          ...(!!isEdit && matchedService
            ? {
                companyServiceId: matchedService?.id,
              }
            : {}),
        };
      });

      setServicesData(updatedServicesData);
    }
  }, [isEdit, getValues]);

  useEffect(() => {
    const service = getValues()?.service;
    const venue = getValues()?.venue;

    setIsVendorProviderOrService(!service && !venue);
  }, [getValues, setIsVendorProviderOrService]);

  const handleServiceCategoryChange = (itemId, isChecked) => {
    setAllCheckBoxError(false);
    const companyServices =
      editVendorObj?.company?.find((val) => val)?.companyService || [];
    const serviceCategoryIds = companyServices?.map(
      (item) => item?.category?.id,
    );

    const updatedServicesData = servicesData?.map((service) => {
      const isExistingService = serviceCategoryIds.includes(service.id);

      // skip services that haven't changed
      if (service?.id === itemId && service?.isChecked !== isChecked) {
        let type;
        if (!isExistingService && isChecked) {
          type = "add"; // new service being checked
        } else if (isExistingService && !isChecked) {
          type = "delete"; // existing service being unchecked
        }

        return {
          ...service,
          isChecked,
          type,
        };
      }
      return service;
    });

    setServicesData(updatedServicesData);
  };

  const handlerAddEditVendor = async (data) => {
    const service = getValues("service");
    const venue = getValues("venue");

    if (!service && !venue) {
      setError("venueOrServiceProvider", {
        type: "manual",
        message: "Select at least one option from providing venue / service",
      });
      return;
    }
    if (
      !!getValues()?.service &&
      servicesData.every((item) => !item?.isChecked)
    ) {
      setAllCheckBoxError(true);
      toast.error("Select at least one service to provide");
      return;
    }
    !!isEdit
      ? onSubmission(data, editVendorObj.id, "edit")
      : onSubmission(data, null, "add");
  };

  return (
    <form className={"w-full"} onSubmit={handleSubmit(handlerAddEditVendor)}>
      <div className={"rounded-2xl md:pt-6 md:px-6 pt-5 px-5"}>
        <div
          className={"flex flex-col items-center justify-center gap-y-3 w-full"}
        >
          <Controller
            control={control}
            name={"fullName"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"text"}
                  name={"fullName"}
                  mainContainerStyle={"w-full flex-1"}
                  label={labels.fullName}
                  className={`w-full flex-1 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.fullName}
                  error={Boolean(errors?.fullName)}
                  errorText={errors.fullName?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("fullName");
                    setValue("fullName", e.target.value);
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name={"phoneNumber"}
            render={({ field: { value } }) => {
              return (
                <PhoneNumberInput
                  type={"text"}
                  name={"phoneNumber"}
                  mainContainerStyle={"w-full"}
                  label={labels.phoneNumber}
                  className={`w-full font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.phoneNumber}
                  error={Boolean(errors?.phoneNumber)}
                  errorText={errors.phoneNumber?.message}
                  defaultErrorMessage={errors.phoneNumber?.message}
                  value={value}
                  autocomplete={"nope"}
                  disableDropdown
                  onChange={(val) => {
                    setValue("phoneNumber", val);
                    clearErrors("phoneNumber");
                  }}
                  onValidityChange={(isValid) => {
                    if (!isValid) {
                      setError("phoneNumber", {
                        type: "manual",
                        message: "Invalid phone number",
                      });
                    } else {
                      clearErrors("phoneNumber");
                    }
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name={"email"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"email"}
                  name={"email"}
                  mainContainerStyle={"w-full flex-1"}
                  label={labels.emailAddress}
                  className={`w-full flex-1 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.emailAddress}
                  error={Boolean(errors?.email)}
                  errorText={errors.email?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("email");
                    setValue("email", e.target.value.replace(/\s/g, ""));
                  }}
                />
              );
            }}
          />
          {!!isEdit ? null : (
            <Controller
              control={control}
              name={"password"}
              render={({ field: { value } }) => {
                return (
                  <PasswordInput
                    name={"password"}
                    label={labels.password}
                    className={`w-full p-3 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                    placeholder={labels.password}
                    error={Boolean(errors?.password)}
                    errorText={errors.password?.message}
                    value={value}
                    onChange={(e) => {
                      clearErrors("password");
                      setValue("password", e.target.value.replace(/\s/g, ""));
                    }}
                  />
                );
              }}
            />
          )}
          {!!isEdit ? null : (
            <Controller
              control={control}
              name={"confirmPassword"}
              render={({ field: { value } }) => {
                return (
                  <PasswordInput
                    name={"confirmPassword"}
                    label={labels.confirmNewPassword}
                    className={`w-full p-3 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                    placeholder={labels.confirmPassword}
                    error={Boolean(errors?.confirmPassword)}
                    errorText={errors.confirmPassword?.message}
                    value={value}
                    onChange={(e) => {
                      clearErrors("confirmPassword");
                      setValue(
                        "confirmPassword",
                        e.target.value.replace(/\s/g, ""),
                      );
                    }}
                  />
                );
              }}
            />
          )}
          <Controller
            control={control}
            name={"companyName"}
            render={({ field: { value } }) => {
              return (
                <Input
                  name={"companyName"}
                  label={labels.companyName}
                  className={`w-full p-3 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.companyName}
                  error={Boolean(errors?.companyName)}
                  errorText={errors.companyName?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("companyName");
                    setValue("companyName", e.target.value);
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name={"comercialNumber"}
            render={({ field: { value } }) => {
              return (
                <Input
                  name={"comercialNumber"}
                  label={labels.comercialNumber}
                  className={`w-full p-3 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.comercialNumber}
                  error={Boolean(errors?.comercialNumber)}
                  errorText={errors.comercialNumber?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("comercialNumber");
                    setValue("comercialNumber", e.target.value);
                  }}
                />
              );
            }}
          />

          {!!errors.venueOrServiceProvider?.message ? (
            <div
              className={
                "w-full flex bg-c_F5F6FA rounded-md py-2 -mb-2 px-1 xl:items-center lg:items-center md:items-center items-start gap-x-2"
              }
            >
              <Image
                src={InfoIconWarningYellow}
                alt={"infoicon"}
                width={20}
                height={20}
                className={"!w-[20px] !h-[20px] rounded-full"}
              />
              <Paragraph
                className={
                  "md:!text-fs_14 !text-fs_14 font-outfit_regular !text-c_181818"
                }
              >
                {errors.venueOrServiceProvider?.message}
              </Paragraph>
            </div>
          ) : null}

          <RadioButton
            tagLine={labels?.wouldYouLikeToCreateAVenue}
            setIsVendorProviderOrService={setIsVendorProviderOrService}
            errorClearField={"venueOrServiceProvider"}
            clearErrors={clearErrors}
            options={labels?.yesNoArray}
            selectedItem={getValues("venue")}
            setSelectedItem={(key, value) =>
              setValue(key, value, { shouldValidate: true })
            }
            error={Boolean(errors?.venue)}
            errorText={errors?.venue?.message}
            fieldKey={"venue"}
          />

          <RadioButton
            tagLine={labels?.wouldYouLikeToCreateAServices}
            setIsVendorProviderOrService={setIsVendorProviderOrService}
            errorClearField={"venueOrServiceProvider"}
            clearErrors={clearErrors}
            options={labels?.yesNoArray}
            selectedItem={getValues("service")}
            setSelectedItem={(key, value) =>
              setValue(key, value, { shouldValidate: true })
            }
            error={Boolean(errors?.service)}
            errorText={errors?.service?.message}
            fieldKey={"service"}
          />

          {!!servicesData && !!getValues().service ? (
            <div
              className={
                "w-full flex flex-wrap items-center justify-start gap-x-4 gap-y-2"
              }
            >
              {servicesData?.map((item, idx) => {
                return (
                  <CheckBox
                    key={idx}
                    label={item?.nameEn}
                    checked={item?.isChecked}
                    error={allCheckBoxError}
                    onChange={(newState) =>
                      handleServiceCategoryChange(item?.id, newState)
                    }
                  />
                );
              })}
            </div>
          ) : null}
        </div>

        <Button
          type={"submit"}
          variant={"primary"}
          isLoading={loading}
          size={"xl"}
          label={!!isEdit ? labels.saveChanges : labels.add}
          className={"capitalize mt-5 select-none"}
        />
      </div>
    </form>
  );
};

export default AddVendorForm;
