/** @format */

import { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Flatpickr from "react-flatpickr";
import Image from "../image";
import Input from "../input";
import moment from "moment";

const DateInput = ({
  placeholderText = "",
  selected = null,
  onChange = () => {},
  leftIcon = false,
  leftIconImage,
  iconContainerStyle,
  iconStyle = "",
  value = "",
  setValue = () => {},
  errors,
  label = null,
  ...props
}) => {
  return (
    <Popover className={"w-full relative"}>
      <PopoverButton className={"w-full outline-none"}>
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
        <div className={"w-full"}>
          <Input
            type={"text"}
            id={"date"}
            name={"date"}
            placeholder={placeholderText}
            value={!!value ? moment(value).format("DD/MM/YYYY") : ""}
            className={`relative w-full pl-7 md:pl-8 font-outfit_regular text-fs_16 placeholder:text-c_747474 text-c_181818 rounded-xl min-h-full h-full outline-none`}
            error={Boolean(errors?.date)}
            errorText={errors?.date?.message}
            {...props}
          />
          <Image
            src={leftIconImage}
            alt={"calenderIcon"}
            className={`absolute bottom-[15px] left-4 !w-4 !h-4`}
          />
        </div>
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          className={
            "absolute z-[999] right-0 bottom-10 lg:bottom-14 rounded-lg bg-none outline-none border-none shadow-none"
          }
        >
          {({ close }) => (
            <Flatpickr
              options={{
                inline: true,
                monthSelectorType: "dropdown",
                yearSelectorType: "dropdown",
              }}
              value={value}
              onChange={(selectedDates) => {
                clearErrors("date");
                setValue("date", selectedDates[0]);
                close();
              }}
              className={"hidden outline-none"}
            />
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default DateInput;
