/** @format */

import { Icons } from "../../../assets/icons";
import { Images } from "../../../assets/images";
import { BiMenuAltLeft } from "react-icons/bi";
import Button from "../../atoms/button";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { BreakPoints } from "../../../constants";
import Image from "../../atoms/image";
import NotificationPopover from "../../molecules/notificationPopover";
import UserAvatarMenuDropdown from "../../molecules/userAvatarMenuDropdown";
import labels from "../../../locale";
import { useNavigate } from "react-router-dom";
import { getUserData, removeLoginData } from "../../../store/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { removeLocalStorageData } from "../../../utils";

const { Notification, DefaultAvatar } = Icons;
const { PersonImage } = Images;
const { profile, settings, logout } = labels;

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useSelector(getUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = useWindowWidth();

  const handlerLogout = () => {
    dispatch(removeLoginData());
    removeLocalStorageData("user");
    navigate("/login");
  };

  const userDropdownOptions = [
    // { id: 1, label: profile, action: () => {} },
    {
      id: 1,
      label: logout,
      action: handlerLogout,
    },
  ];

  return (
    <div
      className={`flex bg-white py-4 px-6 md:px-8 items-center ${
        width >= BreakPoints.LAPTOP ? "justify-end" : "justify-between"
      }`}
    >
      {width >= BreakPoints.LAPTOP ? null : (
        <Button
          variant={"none"}
          size={"none"}
          Icon={BiMenuAltLeft}
          buttonContentPosition={"justify-start"}
          className={"!w-fit"}
          iconSize={28}
          iconColor={"#444444"}
          onClick={() => setSidebarOpen((prev) => !prev)}
        />
      )}

      <div className={"flex items-center gap-8"}>
        {/* <div className={"w-6 h-6"}>
          <NotificationPopover
            button={
              <Image
                src={Notification}
                alt={notificationIcon"}
                className={`h-full w-full object-contain`}
              />
            }
          />
        </div> */}
        <div className={"h-fit"}>
          <UserAvatarMenuDropdown
            user={user}
            button={
              <Image
                src={DefaultAvatar}
                alt={`${user?.fullName}-avatar`}
                className={
                  "!h-[48px] !w-[48px] object-cover object-center rounded-full"
                }
              />
            }
            options={userDropdownOptions}
            showLogoutOption={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
