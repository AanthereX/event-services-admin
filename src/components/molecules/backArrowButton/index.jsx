/** @format */

import { useNavigate } from "react-router-dom";

import { Icons } from "../../../assets/icons";

import labels from "../../../locale";

import Image from "../../atoms/image";
import Button from "../../atoms/button";

const BackArrowButton = () => {
  const { BackIconSvg } = Icons;
  const navigate = useNavigate();
  return (
    <Button
      size={"none"}
      variant={"none"}
      className={"!w-fit select-none !ml-[24px] !mt-[24px]"}
      onClick={() => navigate(-1)}
    >
      <div className={"w-fit flex items-center justify-start gap-x-2"}>
        <Image src={BackIconSvg} alt={"backarrow"} />

        <span
          className={
            "capitalize text-c_282828 text-f_16 leading-[14px] font-outfit_medium"
          }
        >
          {labels.back}
        </span>
      </div>
    </Button>
  );
};
export default BackArrowButton;
