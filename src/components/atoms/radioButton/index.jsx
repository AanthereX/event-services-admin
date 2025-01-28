/** @format */

import { useState, useEffect } from "react";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import Paragraph from "../paragraph";

function RadioButtons({
  options = [],
  setIsVendorProviderOrService = () => {},
  clearErrors = () => {},
  errorClearField = "",
  selectedItem = "",
  setSelectedItem = () => {},
  tagLine = "",
  className = "",
  error = null,
  errorText = "",
  fieldKey = "",
}) {
  const [selected, setSelected] = useState(!!selectedItem ? "Yes" : "No");
  useEffect(() => {
    const isSelectedYes = selected === "Yes";
    if (selectedItem !== isSelectedYes) {
      clearErrors(errorClearField);
      setSelectedItem(fieldKey, isSelectedYes);
      setIsVendorProviderOrService((prev) => !isSelectedYes && prev);
    }
  }, [
    selected,
    fieldKey,
    selectedItem,
    setSelectedItem,
    setIsVendorProviderOrService,
  ]);

  return (
    <div className={"self-start"}>
      {tagLine ? (
        <Paragraph
          className={
            "font-outfit_semiBold cursor-pointer text-fs_16 md:text-fs_16 leading-[40px]"
          }
        >
          {tagLine}
        </Paragraph>
      ) : null}
      <RadioGroup
        value={selected}
        onChange={setSelected}
        aria-label={"server-size"}
        className={`flex items-center gap-3 ${className}`}
      >
        {options.map((plan) => (
          <Field
            key={plan}
            className={
              "flex items-center cursor-pointer font-outfit_regular text-sm gap-2"
            }
          >
            <Radio
              value={plan}
              className={`group flex size-[22px] items-center justify-center rounded-full border border-c_primary bg-white data-[checked]:bg-white`}
            >
              <span
                className={`invisible size-[16px] rounded-full bg-c_primary group-data-[checked]:visible`}
              />
            </Radio>
            <Label className={"cursor-pointer"}>{plan}</Label>
          </Field>
        ))}
      </RadioGroup>
      {/* {error && (
        <p className={"!text-start text-c_FF3333 text-fs_12 mt-1"}>
          {errorText}
        </p>
      )} */}
    </div>
  );
}

export default RadioButtons;
