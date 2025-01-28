/** @format */

import {
  Description,
  Dialog,
  DialogTitle,
  Transition,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";

import React, { Fragment } from "react";
import { Icons } from "../../../assets/icons";
import Image from "../../atoms/image";

/**
 * Renders a modal component with the provided title, content, and styling.
 *
 * @param {boolean} isOpen - Flag indicating if the modal is open
 * @param {function} closeModal - Function to close the modal
 * @param {string} title - Title of the modal
 * @param {JSX.Element} content - Content to display in the modal
 * @param {string} containerClassName - CSS classes for the modal container
 * @return {JSX.Element} The modal component
 */
const Modal = ({
  isOpen,
  closeModal,
  title,
  description = null,
  content,
  maxWidth = "max-w-md",
  containerClassName,
  modalZindex = "z-[98]",
  titleStyle,
}) => {
  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog
        as={"div"}
        className={`relative ${modalZindex}`}
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 z-[88] bg-c_76767687 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 z-[99] overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel
                className={`w-full ${maxWidth} transform rounded-2xl bg-white py-4 text-left align-middle shadow-xl transition-all ${containerClassName}`}
              >
                <div className='flex justify-end pr-4'>
                  <Image
                    src={Icons.CrossIconBlack}
                    alt={"crossIcon"}
                    onClick={closeModal}
                    aria-hidden={"true"}
                    className={
                      "w-8 rounded-lg h-8 text-black border border-c_primary p-2 cursor-pointer"
                    }
                  />
                </div>

                {!!title && (
                  <DialogTitle
                    as={"h1"}
                    className={`text-fs_30 md:text-fs_36 md:leading-[46px] text-black text-center !font-outfit_semiBold ${titleStyle}`}
                  >
                    {title}
                  </DialogTitle>
                )}
                {!!description && (
                  <Description
                    as={"p"}
                    className={
                      "w-[32ch] mx-auto text-fs_16 md:text-fs_16 md:leading-[20px] text-black/35 text-center !font-outfit_regular mt-3"
                    }
                  >
                    {description}
                  </Description>
                )}
                {content}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
