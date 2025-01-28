/** @format */

import { Fragment } from "react";
import Select, { components } from "react-select";
import { Icons } from "../../../assets/icons";
import Image from "../../atoms/image";

const SelectInput = ({
  placeholder,
  className = "",
  options = [],
  isSearchable = false,
  value,
  onChange,
  label = null,
  error = null,
  errorText,
  isMulti = false,
  selected,
  isOptionDisabled = false,
  isDisabled = false,
  readonly = false,
  ...rest
}) => {
  const { DownArrow } = Icons;

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <div className={"ml-[10px]"}>
          <Image
            width={10}
            height={10}
            src={DownArrow}
            alt={"downarrow"}
            className={"absolute top-4 right-2 !w-[10px] !h-[10px]"}
            draggable={false}
          />
        </div>
      </components.DropdownIndicator>
    );
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: error ? "#FF3333" : "#D1D1D1",
      color: "#3C3C43D9",
      minHeight: "42px",
      height: "42px",
      width: "150px",
      minWidth: "100px",
      display: "flex",
      padding: "0 0",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "8px",
      overflow: "hidden",
      "@media (max-width: 640px)": {
        minHeight: "42px",
        height: "42px",
        minWidth: "80px",
        padding: "0 0",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 10px",
      flex: "1",
      display: "inline-flex",
      flexWrap: "nowrap",
      alignItems: "center",
      fontSize: "14px",
      "@media (max-width: 640px)": {
        fontSize: "12px",
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "42px",
      "@media (max-width: 640px)": {
        height: "42px",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 6px 0px 0px",
      color: "#000",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#3C3C43D9",
      fontSize: "14px",
      "@media (max-width: 640px)": {
        fontSize: "12px",
      },
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#f1f1f1",
      borderRadius: "4px",
      margin: "2px",
      "@media (max-width: 640px)": {
        fontSize: "12px",
      },
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#000",
      padding: "3px 6px",
      "@media (max-width: 640px)": {
        padding: "2px 4px",
      },
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#000",
      ":hover": {
        backgroundColor: "#FF3333",
        color: "#fff",
        cursor: "pointer",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <Fragment>
      {label && (
        <div className={"text-start mt-1"}>
          <label className={"text-c_747474 font-outfit_medium text-fs_14"}>
            {label}
          </label>
        </div>
      )}

      <Select
        placeholder={placeholder}
        styles={customStyles}
        value={value}
        onChange={onChange}
        options={options}
        className={`!cursor-pointer ${className}`}
        isSearchable={isSearchable}
        isMulti={isMulti}
        selected={selected}
        readonly={readonly}
        isDisabled={isDisabled}
        components={{ DropdownIndicator }}
        {...rest}
      />

      {!!error && (
        <span className={"text-c_FF3333 text-sm block mt-1"}>{errorText}</span>
      )}
    </Fragment>
  );
};

export default SelectInput;
