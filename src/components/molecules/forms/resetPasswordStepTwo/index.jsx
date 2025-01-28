/** @format */

import { Fragment } from "react";
import { Icons } from "../../../../assets/icons";
import Image from "../../../atoms/image";
import Paragraph from "../../../atoms/paragraph";
import Heading from "../../../atoms/heading";
import labels from "../../../../locale";

const ResetPasswordStepTwo = ({ step, setStep, activeFlow, setActiveFlow }) => {
  const { tickSuccessIcon } = Icons;
  return (
    <Fragment>
      <div
        className={"flex flex-col items-center justify-between gap-y-[10px]"}
      >
        <Image
          src={tickSuccessIcon}
          alt={"tickicon"}
          width={57}
          height={57}
          className={"mb-5"}
        />

        <Heading
          className={
            "font-outfit_semiBold text-center text-black text-fs_22 md:text-fs_24 leading-[30px]"
          }
        >
          {labels.emailSent}
        </Heading>

        <Paragraph
          className={
            "font-outfit_regular md:w-[36ch] w-[30ch] text-center !text-c_747474 text-fs_14 md:text-fs_14 leading-[17px]"
          }
        >
          {labels.resetPasswordLinkHasBeenSent}
        </Paragraph>
      </div>
    </Fragment>
  );
};

export default ResetPasswordStepTwo;
