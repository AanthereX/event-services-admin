/** @format */

import React from "react";
import InvitationsCard from "../../../molecules/invitationsCard";
import TextInput from "../../../atoms/input";
import Heading from "../../../atoms/heading";
import labels from "../../../../locale";
import Paragraph from "../../../atoms/paragraph";
import { Icons } from "../../../../assets/icons";
import Button from "../../../atoms/button";

const InvitationModal = ({ data, setSendInvitation }) => {
  return (
    <div>
      <InvitationsCard
        data={data}
        footerVisible={false}
        headingClassname={"md:text-fs_20 !font-outfit_medium text-fs_18 pb-1.5"}
        containerClassname={"px-[20px] py-[26px]"}
        locationHeadingClassname={
          "md:text-fs_16 !font-outfit_regular text-fs_16"
        }
        iconsTextClassname={
          "text-fs_14 md:text-fs_16 lg:text-fs_16 xl:text-fs_16"
        }
      />

      <div className='px-4'>
        <TextInput
          icon={true}
          placeholder={labels.search}
          searchContainerStyle={`min-w-full !h-[40px]
         
        `}
          iconStyle={"!text-c_primary"}
          extraStyle={`!text-lg`}
          className={"!text-black w-full placeholder:!text-black !text-fs_12"}
          // value={searchValue}
          isWidthFull
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className='border rounded-lg border-c_D1D1D1 m-4 p-4'>
        <Heading className='!font-outfit_medium md:!text-fs_24 !text-fs_16'>
          {labels.monetaryGift} ({data?.giftCards?.lenngth || 0})
        </Heading>

        <div className='overflow-y-scroll max-h-[250px]'>
          {data?.giftCards.map((ele, index) => {
            return (
              <div className='border-b flex flex-col gap-2 py-2 border-c_D1D1D1'>
                <Heading className='md:!text-fs_15 text-fs_13 truncate !font-outfit_medium leading-[12px]'>
                  {ele?.title}
                </Heading>
                <Paragraph
                  className={
                    "font-outfit_regular !text-c_9B9B9B text-fs_12 md:!text-fs_14 leading-[12px]"
                  }
                >
                  {ele?.description}
                </Paragraph>
                <Paragraph
                  className={
                    "font-outfit_medium !text-c_5466F3 text-fs_14 md:!text-fs_14 "
                  }
                >
                  {ele?.amount}
                </Paragraph>
              </div>
            );
          })}
        </div>
      </div>
      <div className='mx-4 mt-4'>
        <Button
          img={Icons.Download}
          onClick={() => setSendInvitation(null)}
          label='Export'
          className={`flex  justify-center !text-white  items-center !w-full h-[40px]  !bg-c_primary !py-2 px-4`}
        />
      </div>
    </div>
  );
};

export default InvitationModal;
