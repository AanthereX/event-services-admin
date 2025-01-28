/** @format */

import { useEffect, useState } from "react";
import { Checkbox } from "@headlessui/react";

const CheckBox = ({
  checked = false,
  label = null,
  error = null,
  errorText = "",
  onChange = () => {},
}) => {
  const [enabled, setEnabled] = useState(checked);

  useEffect(() => {
    setEnabled(checked);
  }, [checked]);

  const handleChange = (newState) => {
    setEnabled(newState);
    onChange(newState);
  };

  return (
    <div className={"flex flex-row items-center justify-center gap-2"}>
      <Checkbox
        name={label}
        id={label}
        checked={enabled}
        onChange={handleChange}
        className={`group cursor-pointer block size-4 rounded ${
          !!error ? "border border-c_FF3333" : "border border-c_D1D1D1"
        } bg-white data-[checked]:bg-c_primary`}
      >
        <svg
          className={`stroke-white opacity-0 group-data-[checked]:opacity-100`}
          viewBox='0 0 14 14'
          fill='none'
        >
          <path
            d='M3 8L6 11L11 3.5'
            strokeWidth={2}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />
        </svg>
      </Checkbox>
      {!!label && (
        <label
          htmlFor={label}
          className={
            "text-c_202224 text-start cursor-pointer font-outfit_regular select-none leading-[20px] text-fs_16"
          }
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
