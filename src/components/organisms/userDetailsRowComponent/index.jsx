/** @format */

import Image from "../../atoms/image";
import Paragraph from "../../atoms/paragraph";
import Heading from "../../atoms/heading";
import labels from "../../../locale";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { BreakPoints } from "../../../constants";
import { Icons } from "../../../assets/icons";

const UserDetailsRowSection = ({ userDetails = {} }) => {
  const width = useWindowWidth();
  const { DefaultAvatar } = Icons;

  return (
    <section className="w-full flex flex-wrap gap-4 mt-[15px] max-w-[1440px] mb-[25px]">
      <div className="lg:flex-1 md:w-4/12 w-full flex lg:flex-col xl:flex-row flex-row justify-start items-center lg:gap-3 gap-5 pb-4 pt-1 md:py-0">
        <Image
          src={userDetails?.image || DefaultAvatar}
          alt={!!userDetails ? `${userDetails?.fullName}-avatar` : "useravatar"}
          width={92}
          height={92}
          className={"w-[76px] h-[76px] md:w-[92px] md:h-[92px] rounded-full"}
        />
        <div className="lg:flex-1 md:w-4/12 w-full flex flex-col justify-center items-start gap-0.5 border-b md:border-b-0 md:border-r-0 lg:border-r md:border-c_FFFFFF lg:!border-c_DFDFDF xl:border-c_DFDFDF pb-4 pt-1 md:py-0">
          <Paragraph className="text-c_818181 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
            {labels.fullName}
          </Paragraph>
          <Heading className="text-c_121212 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
            {userDetails?.fullName ?? labels.notAvailable}
          </Heading>
        </div>
      </div>

      {width >= BreakPoints.TAB ? (
        <div className="lg:flex-1 md:w-4/12 w-full flex flex-col justify-center items-start gap-0.5 border-b md:border-b-0 md:border-r md:border-c_DFDFDF px-0 lg:px-4 xl:px-0 pb-4 pt-1 md:py-0">
          <Paragraph className="text-c_818181 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
            {labels.emailAddress}
          </Paragraph>
          <Heading className="text-c_121212 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
            {userDetails?.email ?? labels.notAvailable}
          </Heading>
        </div>
      ) : null}

      <div className="lg:flex-1 md:w-4/12 w-full flex flex-col justify-center items-start gap-0.5 border-b md:border-b-0 pb-4 pt-1 md:py-0">
        <Paragraph className="text-c_818181 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
          {labels.phoneNumber}
        </Paragraph>
        <Heading className="text-c_121212 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
          {userDetails?.phoneNumber ?? labels.notAvailable}
        </Heading>
      </div>

      {width <= BreakPoints.MOBILE ? (
        <div className="lg:flex-1 md:w-4/12 w-full flex flex-col justify-center items-start gap-0.5 md:border-b-0 md:border-r md:border-c_DFDFDF pb-4 pt-1 md:py-0">
          <Paragraph className="text-c_818181 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
            {labels.emailAddress}
          </Paragraph>
          <Heading className="text-c_121212 text-fs_18 lg:text-fs_16 xl:text-fs_18 font-outfit_regular leading-[22px]">
            {userDetails?.email ?? labels.notAvailable}
          </Heading>
        </div>
      ) : null}
    </section>
  );
};

export default UserDetailsRowSection;
