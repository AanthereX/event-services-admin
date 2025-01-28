/** @format */

import { Fragment } from "react";
import { Icons } from "../../../../assets/icons";
import Image from "../../../atoms/image";
import Paragraph from "../../../atoms/paragraph";
import labels from "../../../../locale";
import Input from "../../../atoms/input";

const ResetPasswordStepOne = ({
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
          {labels.forgetPassword}
        </Paragraph>
      </div>

      {/* <Paragraph
        className={
          "font-outfit_regular text-center select-none text-black/35 text-fs_16 leading-[20px] mt-[14px] mb-5"
        }
      >{`${labels.sedUtPerspiciatis}`}</Paragraph> */}

      <div className={"flex flex-col items-center justify-center gap-y-3 mt-5"}>
        <Input
          type={"text"}
          name={"email"}
          className={`w-full font-outfit_regular text-fs_16 placeholder:text-c_535353 text-c_181818 outline-none`}
          placeholder={labels.emailAddress}
          error={Boolean(errors?.email)}
          errorText={errors.email}
          value={values?.email}
          onChange={(e) => {
            setErrors((prev) => ({
              ...prev,
              email: null,
            }));
            setValues((prev) => ({
              ...prev,
              email: e.target.value.replace(/\s/g, ""),
            }));
          }}
        />
      </div>
    </Fragment>
  );
};

export default ResetPasswordStepOne;
