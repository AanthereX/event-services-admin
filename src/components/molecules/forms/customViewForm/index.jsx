/** @format */

import { useRef, useState } from "react";
import { Icons } from "../../../../assets/icons";
import Heading from "../../../atoms/heading";
import labels from "../../../../locale";
import DateInput from "../../../atoms/dateInput";
import Button from "../../../atoms/button";
import RadioButtons from "../../../atoms/radioButton";
import Paragraph from "../../../atoms/paragraph";

const { CalenderIcon } = Icons;

const CustomViewForm = () => {
  const [startDate, setStartDate] = useState("");
  const datePickerRef = useRef();
  const [endDate, setEndDate] = useState("");
  return (
    <div className="md:pt-2 md:px-8 pt-0 px-6">
      <Heading className="md:text-fs_20 text- mt-6">
        {labels?.pleaseSelectYourStartAndEndDate}
      </Heading>

      <div className="flex items-center gap-4 mt-3">
        <DateInput
          leftIcon={true}
          leftIconImage={CalenderIcon}
          label={"Start Date"}
          placeholderText={"Start Date"}
        />
        <DateInput
          leftIcon={true}
          leftIconImage={CalenderIcon}
          label={"End Date"}
          placeholderText={"End Date"}
        />
      </div>

      <div className={"space-y-4 mt-6 mb-1"}>
        <Paragraph
          className={"md:text-fs_16 text-fs_16 font-outfit_medium mt-3"}
        >
          {labels.pleaseChooseFileType}
        </Paragraph>
        <RadioButtons
          className={"gap-7"}
          options={labels.exportDefaultViewOptions}
          selectedItem={labels?.exportDefaultViewOptions[0]}
        />
      </div>

      <Button
        variant={"primary"}
        size={"md"}
        label={labels.download}
        className={"capitalize mt-5 mb-4 select-none"}
        btnWidth={"capitalize mt-5 select-none !w-[100%]"}
      />
    </div>
  );
};

export default CustomViewForm;
