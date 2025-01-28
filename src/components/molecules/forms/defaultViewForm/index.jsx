/** @format */

import { useRef, useState } from "react";
import { Icons } from "../../../../assets/icons";
import Heading from "../../../atoms/heading";
import labels from "../../../../locale";
import DateInput from "../../../atoms/dateInput";
import Button from "../../../atoms/button";
import RadioButtons from "../../../atoms/radioButton";

const { CalenderIcon } = Icons;

const DefaultViewForm = () => {
  const datePickerRef = useRef();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className={"md:pt-2 md:px-8 pt-4 px-6"}>
      <Heading className={"md:text-fs_20 text-fs_16 mt-3"}>
        {labels.pleaseChooseFileType}
      </Heading>

      <div className={"mt-4 mb-1"}>
        <RadioButtons
          className={"gap-4"}
          options={labels.exportDefaultViewOptions}
          selectedItem={labels?.exportDefaultViewOptions[0]}
        />
      </div>

      <Button
        variant={"primary"}
        size={"md"}
        label={labels.download}
        className={"capitalize mt-5 mb-2 select-none"}
        btnWidth={"capitalize mt-5 select-none !w-[100%]"}
      />
    </div>
  );
};

export default DefaultViewForm;
