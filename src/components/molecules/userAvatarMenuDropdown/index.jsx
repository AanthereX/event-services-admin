/** @format */

import Paragraph from "../../atoms/paragraph";
import Heading from "../../atoms/heading";
import HeadlessMenuDropdown from "../headlessMenuDropdown";
import labels from "../../../locale";

const UserAvatarMenuDropdown = ({
  user = null,
  button,
  options = [],
  showLogoutOption,
}) => {
  const { adminEmail, admin } = labels;

  return (
    <HeadlessMenuDropdown
      user={user}
      button={button}
      options={options}
      showLogoutOption={showLogoutOption}
      className={"w-[220px]"}
    >
      <div className={"flex flex-col items-start justify-center mb-2.5 px-3"}>
        <Heading
          className={
            "font-outfit_medium select-none capitalize text-fs_16 text-c_3C3C43D9 !leading-[28px] text-start"
          }
        >
          {user?.fullName || admin}
        </Heading>
        <Paragraph
          className={
            "font-outfit_regular text-fs_14 lowercase text-c_9291A5 !leading-none text-start"
          }
        >
          {user?.email || adminEmail}
        </Paragraph>
      </div>
    </HeadlessMenuDropdown>
  );
};

export default UserAvatarMenuDropdown;
