/** @format */

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import Flatpickr from "react-flatpickr";
import { Icons } from "../../../assets/icons";
import Image from "../image";
import moment from "moment";
import Button from "../button";
import labels from "../../../locale";
import { AiOutlineDelete } from "react-icons/ai";

const DateInput = ({
  ref,
  value,
  placeholder = "Date",
  onChange = () => {},
  dateSelected,
  setDateSelected = () => {},
  datePickerRef,
}) => {
  const { DownArrow } = Icons;

  const handleChange = (date) => {
    onChange(date);
  };
  const handleClearDate = (_date, _setDate) => {
    if (!!_date && !!datePickerRef) {
      _setDate("");
      if (!datePickerRef?.current?.flatpickr) return;
      datePickerRef.current.flatpickr.clear();
    }
  };
  return (
    <Popover className={"relative"}>
      <PopoverButton className='w-full md:col-span-6 col-span-12 outline-none'>
        <div className={"relative"}>
          <input
            type={"text"}
            placeholder={placeholder}
            name={"date"}
            className={`!min-w-[110px] !w-[110px] border-[0.8px] placeholder:!pl-1 pl-2 placeholder:text-c_3C3C43D9 text-c_3C3C43D9 border-c_D1D1D1 rounded-[8px] !text-fs_14 !min-h-[42px] !h-[42px] !select-none`}
            value={!!value ? moment(value).format("DD-MM-YYYY") : ""}
          />
          <Image
            width={10}
            height={10}
            src={DownArrow}
            alt={"downarrow"}
            className={"absolute top-4 right-2 !w-[10px] !h-[10px]"}
            draggable={false}
          />
        </div>
      </PopoverButton>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <PopoverPanel
          className={"absolute z-[99] rounded-lg lg:top-14 top-14 left-0"}
        >
          {({ close }) => (
            <Fragment>
              <Flatpickr
                ref={ref}
                options={{
                  inline: true,
                  monthSelectorType: "static",
                  yearSelectorType: "static",
                  // minDate: "today",
                }}
                value={value}
                onChange={(selectedDates) => {
                  handleChange(selectedDates[0]);
                }}
                className={"hidden outline-none"}
              />
              {!!dateSelected && (
                <div className={"mt-2 flex justify-center"}>
                  <Button
                    variant={"danger"}
                    size={"sm"}
                    Icon={AiOutlineDelete}
                    iconSize={16}
                    disabled={!!dateSelected ? false : true}
                    iconColor={"#FFF"}
                    className={`!py-2`}
                    onClick={() => {
                      handleClearDate(dateSelected, setDateSelected);
                      close();
                    }}
                    label={labels.clear}
                  />
                </div>
              )}
            </Fragment>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default DateInput;
