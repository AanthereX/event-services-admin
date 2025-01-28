/** @format */

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";

const HeadlessPopover = ({ button, position = "-left-28", children }) => {
  return (
    <Popover className={"relative"}>
      {({ open }) => (
        <Fragment>
          <PopoverButton className={`outline-none cursor-pointer`}>
            {button}
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
              className={`absolute z-[99] ${position} mt-1 w-screen max-w-[305px] -translate-x-1/2 transform px-4 sm:px-0`}
            >
              {children}
            </PopoverPanel>
          </Transition>
        </Fragment>
      )}
    </Popover>
  );
};

export default HeadlessPopover;
