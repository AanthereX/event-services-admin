/** @format */

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Button from "../../atoms/button";
import labels from "../../../locale";
import { FaAngleDown } from "react-icons/fa6";
import { Fragment } from "react";
import Divider from "../../atoms/divider";

const HeadlessMenuDropdown = ({
  user = null,
  button,
  showBtnDropdownIcon = false,
  menuItemBg = "bg-white",
  className = "w-fit",
  iconColor = "",
  iconSize = 24,
  img = null,
  imgAlt = "",
  imgClassName = "",
  imgWidth = 20,
  imgHeight = 20,
  options = [],
  showLogoutOption = false,
  children,
}) => {
  return (
    <div className={"relative"}>
      <Menu>
        {({ open }) => (
          <Fragment>
            <MenuButton
              className={`flex items-center justify-center gap-x-1 focus:outline-none`}
            >
              {button}
              {!!showBtnDropdownIcon && (
                <FaAngleDown
                  className={`${
                    !!open ? "rotate-180" : "rotate-0"
                  } transition-all ease-in-out size-4 fill-black/60`}
                />
              )}
            </MenuButton>

            <MenuItems
              transition
              anchor={"bottom end"}
              className={`${className} border-[0.8px] border-c_ECECEC origin-bottom-right !py-2 rounded-xl ${menuItemBg} mt-2 text-fs_14 text-c_202224 transition duration-100 ease-out focus:outline-none`}
            >
              {children}

              {!!children && (
                <div className={"w-full"}>
                  <Divider />
                </div>
              )}

              <div className={"mx-1 mt-1"}>
                {options?.map((item, idx) => {
                  return (
                    <MenuItem key={idx}>
                      <Button
                        variant={"none"}
                        size={"md"}
                        label={item?.label}
                        Icon={item?.icon}
                        iconColor={iconColor}
                        iconSize={iconSize}
                        img={img}
                        imgAlt={imgAlt}
                        buttonContentPosition={"justify-start"}
                        imgClassName={imgClassName}
                        width={imgWidth}
                        height={imgHeight}
                        onClick={item?.action}
                        className={
                          "flex w-full items-center rounded hover:bg-black/5 text-fs_14 gap-1 !py-2 !px-3"
                        }
                      />
                    </MenuItem>
                  );
                })}
              </div>

              {/* {!!showLogoutOption && (
                <div className={"w-full"}>
                  <Divider />
                </div>
              )} */}

              {/* {!!showLogoutOption && (
                <MenuItem>
                  <Button
                    label={labels.logout}
                    size={"none"}
                    variant={"none"}
                    onClick={() => {}}
                    buttonContentPosition={"justify-start"}
                    className={"text-fs_14 px-3 mt-1 mb-1"}
                  />
                </MenuItem>
              )} */}
            </MenuItems>
          </Fragment>
        )}
      </Menu>
    </div>
  );
};

export default HeadlessMenuDropdown;
