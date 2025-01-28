/** @format */

import React, { useRef, useState } from "react";
import Heading from "../../../atoms/heading";
import labels from "../../../../locale";
import RadioButtons from "../../../atoms/radioButton";
import DateInput from "../../../atoms/dateInput";
import { Icons } from "../../../../assets/icons";
import Button from "../../../atoms/button";
const { Calenders } = Icons;

const ExportDataForm = () => {
  const datePickerRef = useRef();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="md:pt-2 md:px-8 pt-2 px-6">
      <Heading className="md:text-fs_20 mt-6">
        {labels?.pleaseSelectYourPreference}
      </Heading>

      <div className={"mt-1"}>
        <RadioButtons
          // tagLine={labels?.pleaseSelectYourPreference}
          options={labels?.servicesAndVenue}
          selectedItem={labels?.yesNoArray[1]}
        />
      </div>
      <div className="flex items-center gap-4 mt-6">
        <DateInput
          leftIcon={true}
          leftIconImage={Calenders}
          label={"Start Date"}
          placeholderText={"Start Date"}
        />{" "}
        <DateInput
          leftIcon={true}
          leftIconImage={Calenders}
          label={"End Date"}
          placeholderText={"End Date"}
        />
      </div>

      <Button
        variant={"primary"}
        size={"md"}
        label={labels.download}
        className={"capitalize mt-5 select-none"}
        btnWidth={"capitalize mt-5 select-none !w-[100%]"}
      />
    </div>
  );
};

export default ExportDataForm;
