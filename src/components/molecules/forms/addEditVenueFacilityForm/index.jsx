/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEditVenueFacilitySchema } from "../../../../utils/validate";
import { useForm } from "react-hook-form";
import { Icons } from "../../../../assets/icons";
import labels from "../../../../locale";
import Input from "../../../atoms/input";
import Button from "../../../atoms/button";

const AddEditVenueFacilityForm = ({
  isEdit = false,
  editUserObj = {},
  loading,
  data = {},
  onSubmission = () => {},
}) => {
  const navigate = useNavigate();
  const { logo } = Icons;

  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    clearErrors,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(addEditVenueFacilitySchema),
    defaultValues: !!isEdit
      ? {
          facilityNameEn: `${data?.nameEn}` || "",
          facilityNameAr: `${data?.nameAr}` || "",
        }
      : {
          facilityNameEn: "",
          facilityNameAr: "",
        },
  });

  const submitHandler = async (data) => {
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
    <form className={"w-full"} onSubmit={handleSubmit(submitHandler)}>
      <div className={"rounded-2xl md:pt-6 md:px-6 pt-5 px-5"}>
        <div
          className={
            "flex flex-col items-center justify-center gap-y-3 w-full "
          }
        >
          <Controller
            control={control}
            name={"facilityNameEn"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"text"}
                  name={"facilityNameEn"}
                  mainContainerStyle={"w-full flex-1"}
                  label={labels.facilityNameInEnglish}
                  className={`w-full flex-1 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.facilityNameInEnglish}
                  error={Boolean(errors?.facilityNameEn)}
                  errorText={errors?.facilityNameEn?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("facilityNameEn");
                    setValue("facilityNameEn", e.target.value);
                  }}
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"facilityNameAr"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"text"}
                  name={"facilityNameAr"}
                  mainContainerStyle={"w-full flex-1"}
                  label={labels.facilityNameInArabic}
                  className={`w-full flex-1 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.facilityNameInArabic}
                  error={Boolean(errors?.facilityNameAr)}
                  errorText={errors?.facilityNameAr?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("facilityNameAr");
                    setValue("facilityNameAr", e.target.value);
                  }}
                />
              );
            }}
          />
        </div>

        <Button
          type={"submit"}
          variant={"primary"}
          size={"xl"}
          isLoading={loading}
          disabled={loading}
          label={!!isEdit ? labels.saveChanges : labels.add}
          className={"capitalize mt-6 mb-2 select-none"}
        />
      </div>
    </form>
  );
};

export default AddEditVenueFacilityForm;
