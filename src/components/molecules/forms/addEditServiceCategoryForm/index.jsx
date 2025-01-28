/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEditServiceCategorySchema } from "../../../../utils/validate";
import { useForm } from "react-hook-form";
import { Icons } from "../../../../assets/icons";
import labels from "../../../../locale";
import Input from "../../../atoms/input";
import Button from "../../../atoms/button";

const AddEditServiceCategoryForm = ({
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
    resolver: yupResolver(addEditServiceCategorySchema),
    defaultValues: !!isEdit
      ? {
          categoryNameEn: `${data?.nameEn}` || "",
          categoryNameAr: `${data?.nameAr}` || "",
        }
      : {
          categoryNameEn: "",
          categoryNameAr: "",
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
            name={"categoryNameEn"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"text"}
                  name={"categoryNameEn"}
                  mainContainerStyle={"w-full flex-1"}
                  label={labels.categoryNameInEnglish}
                  className={`w-full flex-1 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.categoryNameInEnglish}
                  error={Boolean(errors?.categoryNameEn)}
                  errorText={errors?.categoryNameEn?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("categoryNameEn");
                    setValue("categoryNameEn", e.target.value);
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name={"categoryNameAr"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"text"}
                  name={"categoryNameAr"}
                  mainContainerStyle={"w-full flex-1"}
                  label={labels.categoryNameInArabic}
                  className={`w-full flex-1 font-outfit_regular text-fs_16 placeholder:!text-c_0000005C text-c_181818 outline-none`}
                  placeholder={labels.categoryNameInArabic}
                  error={Boolean(errors?.categoryNameAr)}
                  errorText={errors?.categoryNameAr?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("categoryNameAr");
                    setValue("categoryNameAr", e.target.value);
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

export default AddEditServiceCategoryForm;
