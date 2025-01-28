/** @format */

import { cn } from "../../../utils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

const PhoneNumberInput = ({
  defaultCountry = "om",
  value = "",
  onChange = () => {},
  label = null,
  error = null,
  errorText = "",
  placeholder = "",
  defaultErrorMessage = "",
  className = "",
  mainContainerClassName = "",
  buttonClassName = "",
  labelClassName = "",
  disableDropdown = false,
  dropdownClassName = "",
  ...rest
}) => {
  const handleOnChange = (phone) => {
    if (!phone.startsWith("+")) {
      phone = "+" + phone;
    }
    onChange(phone);
  };
  return (
    <div
      className={cn(
        "w-full flex flex-col items-start justify-center",
        `${mainContainerClassName}`,
      )}
    >
      {!!label && (
        <div className={"text-start mt-1 mb-2"}>
          <label
            className={cn(
              "!text-c_747474 font-outfit_regular select-none leading-[20px] text-fs_14",
              `${labelClassName}`,
            )}
          >
            {label}
          </label>
        </div>
      )}
      <PhoneInput
        country={defaultCountry}
        value={value}
        inputClass={`${className} ${!!error ? "!border !border-c_FF3333" : ""}`}
        placeholder={placeholder}
        specialLabel={null}
        disableDropdown={disableDropdown}
        buttonClass={`${buttonClassName} ${
          !!error ? "border border-c_FF3333" : ""
        }`}
        dropdownClass={`${dropdownClassName} ${
          !!error ? "border border-c_FF3333" : ""
        }`}
        prefix={"+"}
        onChange={handleOnChange}
        {...rest}
      />
      {!!error && (
        <p className='!text-start text-c_FF3333 text-fs_12 mt-1'>
          {errorText || defaultErrorMessage}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
