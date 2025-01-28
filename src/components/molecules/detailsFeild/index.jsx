/** @format */

import React from "react";
import Paragraph from "../../atoms/paragraph";
import Image from "../../atoms/image";

const DetailsFeild = ({
  title = "",
  description = "",
  titleStyle = "",
  descriptionStyle = "",
  image = false,
}) => {
  return (
    <div>
      <Paragraph
        className={`font-outfit_regular text-fs_18 text-c_818181 md:text-fs_18 leading-[30px] ${titleStyle}`}
      >
        {title}
      </Paragraph>
      <Paragraph
        className={`font-outfit_medium text-fs_18 flex items-center gap-2 md:text-fs_18 leading-[40px] ${descriptionStyle}`}
      >
        {image ? (
          <Image
            src={image}
            className={"!w-[24px] !h-[24px] rounded-full object-contain"}
          />
        ) : null}
        {description}
      </Paragraph>
    </div>
  );
};

export default DetailsFeild;
