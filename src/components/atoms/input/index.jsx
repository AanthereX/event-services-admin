/**
 * eslint-disable react/display-name
 *
 * @format
 */

/* eslint-disable react/prop-types */
import { memo, forwardRef } from "react";
import { Icons } from "../../../assets/icons";
import Image from "../image";
const Input = forwardRef(
  (
    {
      name,
      type = "text",
      value,
      onChange = () => {},
      placeholder = "",
      required,
      errorText = "",
      error = null,
      disabled = false,
      className = "",
      autoComplete = "false",
      label = null,
      onKeyDown,
      isWidthFull = false,
      icon = false,
      iconContainerStyle = "",
      maxLength,
      showIcon = "",
      iconStyle = "",
      searchContainerStyle = "",
      inputPaddingLeft = "pl-0",
      inputHeight = "h-[45px]",
      paddingLeft = true,
      mainContainerStyle = "",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`w-full flex flex-col items-start justify-center ${mainContainerStyle}`}
      >
        {!!label && (
          <div className={"text-start mt-1 mb-2"}>
            <label
              className={
                "text-c_747474 font-outfit_regular select-none leading-[20px] text-fs_14"
              }
            >
              {label}
            </label>
          </div>
        )}
        <div
          className={`!w-full flex ${
            !!error
              ? "border border-c_FF3333 font-outfit_regular"
              : "border-[0.8px] border-c_D1D1D1"
          } rounded-[10px] overflow-hidden py-0 ${
            !!paddingLeft ? "pl-3" : ""
          } ${inputHeight} ${searchContainerStyle}`}
        >
          {icon && (
            <div
              className={`flex items-center justify-center ${iconContainerStyle}`}
            >
              <Image
                src={showIcon || Icons?.SearchIcons}
                alt={"Search Icon"}
                className={`${iconStyle} mr-2`}
              />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${inputPaddingLeft} outline-none min-h-full text-c_252525 placeholder:text-c_404040 placeholder:capitalize ${
              isWidthFull ? "!max-w-full" : "!max-w-[412px]"
            } ${className} ${!!disabled ? "!cursor-not-allowed" : ""}`}
            required={required}
            disabled={disabled}
            name={name}
            maxLength={maxLength}
            id={name}
            aria-autocomplete={"none"}
            autoComplete={autoComplete}
            autoFocus={false}
            onKeyDown={onKeyDown}
            {...props}
          />
        </div>
        {!!error && (
          <p className={"!text-start text-c_FF3333 text-fs_12 mt-1"}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
export default memo(Input);
