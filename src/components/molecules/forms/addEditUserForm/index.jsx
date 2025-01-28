/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEditUserSchema } from "../../../../utils/validate";
import { useForm } from "react-hook-form";
import labels from "../../../../locale";
import Input from "../../../atoms/input";
import PasswordInput from "../../passwordInput";
import Button from "../../../atoms/button";
import PhoneNumberInput from "../../../atoms/phoneNumberInput";

const AddEditUserForm = ({
  isEdit = false,
  editUserObj = {},
  loading,
  data = {},
  onSubmission = () => {},
}) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    control,
    clearErrors,
    setError,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(addEditUserSchema(isEdit)),
    defaultValues: !!isEdit
      ? {
          email: data?.email || "",
          fullName: data?.fullName || "",
          phoneNumber: data?.phoneNumber || "",
        }
      : {
          email: "",
          fullName: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        },
  });

  const onSubmit = async (data) => {
    // if (
    //   editUserObj &&
    //   editUserObj.avatar != data.avatar &&
    //   typeof data?.avatar != "string" &&
    //   imageUploading != "Updated"
    // ) {
    //   let url = await ImageUploading(getValues("avatar"));
    //   if (url) {
    //     data?.avatar = url;
    //   }
    // }

    !!isEdit
      ? onSubmission(data, editUserObj.id, "edit")
      : onSubmission(data, null, "add");
  };

  return (
    <form className={"w-full"} onSubmit={handleSubmit(onSubmit)}>
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
                  errorText={errors?.fullName?.message}
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
            name={"email"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"text"}
                  mainContainerStyle={"w-full flex-1"}
                  label={labels.emailAddress}
                  className={`w-full flex-1 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.emailAddress}
                  disabled={!!isEdit ? true : false}
                  error={Boolean(errors?.email)}
                  errorText={errors.email?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("email");
                    setValue(
                      "email",
                      e.target.value.replace(/\s/g, "").toLowerCase(),
                    );
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
          {!!isEdit ? null : (
            <Controller
              control={control}
              name={"password"}
              render={({ field: { value } }) => {
                return (
                  <PasswordInput
                    name={"password"}
                    label={labels.password}
                    className={`w-full p-2 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
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
                    label={labels.confirmPassword}
                    className={`w-full p-2 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
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
        </div>

        <Button
          type={"submit"}
          variant={"primary"}
          isLoading={loading}
          disabled={loading}
          size={"xl"}
          label={!!isEdit ? labels.saveChanges : labels.add}
          className={"capitalize mt-6 mb-2 select-none"}
        />
      </div>
    </form>
  );
};

export default AddEditUserForm;
