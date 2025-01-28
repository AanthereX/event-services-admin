/** @format */

import { Fragment } from "react";
import Paragraph from "../../atoms/paragraph";
import labels from "../../../locale";
import CountUp from "react-countup";
import PeopleInvitedTable from "../tables/peopleInvitedTable";

const PeopleInvitedSection = ({ loading = false, data, pageData }) => {
  return (
    <Fragment>
      <section
        className={
          "border border-c_D1D1D1 rounded-[21px] md:px-[50px] px-[20px] md:py-[30px] py-[20px]"
        }
      >
        <Fragment>
          <Paragraph
            className={
              "text-black font-outfit_medium flex items-center gap-1.5 leading-[22px] md:text-fs_24 mb-4 text-fs_18"
            }
          >
            {labels.peopleInvited}
            <CountUp
              className={
                "md:text-fs_24 text-fs_16 text-black font-outfit_medium leading-[30px] tracking-[-0.3px]"
              }
              duration={2}
              preserveValue={false}
              start={0}
              end={pageData?.totalItems}
              formattingFn={(val) => `(${val})`}
            />
          </Paragraph>

          <div
            className={
              "w-full min-w-full h-[300px] max-h-[300px] overflow-y-auto pl-0 pr-6"
            }
          >
            <PeopleInvitedTable
              pageData={pageData}
              invitees={data}
              loading={loading}
            />
          </div>
        </Fragment>
      </section>
    </Fragment>
  );
};

export default PeopleInvitedSection;
