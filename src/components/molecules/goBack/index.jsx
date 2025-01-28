import React from "react";
import Paragraph from "../../atoms/paragraph";
import labels from "../../../locale";
import { Icons } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-3 pb-2 cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <img
        src={Icons.BackArrowIcon}
        alt="Go Back Icons"
        className="h-[28px] w-[28px] "
      />
      <Paragraph
        className={
          "font-outfit_semiBold text-fs_14 md:text-fs_14 leading-[40px]"
        }
      >
        {labels.back}
      </Paragraph>
    </div>
  );
};

export default GoBack;
