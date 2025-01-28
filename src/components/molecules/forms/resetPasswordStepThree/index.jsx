/** @format */

import { Icons } from "../../../../assets/icons";
import Image from "../../../atoms/image";
import Paragraph from "../../../atoms/paragraph";
import labels from "../../../../locale";
import PasswordInput from "../../passwordInput";
import { Fragment } from "react";

const ResetPasswordStepThree = ({
  values,
  setValues,
  errors,
  setErrors,
  setStep,
}) => {
  const { logo } = Icons;

  return (
    <Fragment>
      <div className={"flex flex-col items-center justify-between gap-y-0"}>
        <Image
          src={logo}
          alt={"logo"}
          width={75}
          height={71}
          className={"mb-[10px]"}
        />

        <Paragraph
          className={
            "font-outfit_semiBold text-fs_24 md:text-fs_32 leading-[40px]"
          }
        >
          {labels.setNewPassword}
        </Paragraph>
      </div>

      {/* <Paragraph
        className={
          "font-outfit_regular text-center select-none text-black/35 text-fs_16 leading-[20px] mt-[14px] mb-5"
        }
      >{`${labels.sedUtPerspiciatis}`}</Paragraph> */}

      <div className={"flex flex-col items-center justify-center gap-y-3"}>
        <PasswordInput
          name={"newPassword"}
          label={labels.newPassword}
          className={`w-full font-outfit_regular text-fs_16 placeholder:text-c_535353 text-c_181818 outline-none`}
          placeholder={labels.password}
          error={Boolean(errors?.newPassword)}
          errorText={errors.newPassword}
          value={values?.newPassword}
          onChange={(e) => {
            setErrors((prev) => ({
              ...prev,
              newPassword: null,
            }));
            setValues((prev) => ({
              ...prev,
              newPassword: e.target.value.replace(/\s/g, ""),
            }));
          }}
        />

        <PasswordInput
          name={"confirmNewPassword"}
          label={labels.confirmNewPassword}
          className={`w-full font-outfit_regular text-fs_16 placeholder:text-c_535353 text-c_181818 outline-none`}
          placeholder={labels.password}
          error={Boolean(errors?.confirmNewPassword)}
          errorText={errors.confirmNewPassword}
          value={values?.confirmNewPassword}
          onChange={(e) => {
            setErrors((prev) => ({
              ...prev,
              confirmNewPassword: null,
            }));
            setValues((prev) => ({
              ...prev,
              confirmNewPassword: e.target.value.replace(/\s/g, ""),
            }));
          }}
        />
      </div>
    </Fragment>
  );
};

export default ResetPasswordStepThree;
