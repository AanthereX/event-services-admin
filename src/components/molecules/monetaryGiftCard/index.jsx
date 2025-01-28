/** @format */

import { Fragment, memo } from "react";
import Paragraph from "../../atoms/paragraph";
import { kFormatter } from "../../../utils";
import labels from "../../../locale";
import Heading from "../../atoms/heading";
import CountUp from "react-countup";
import InvitationsCard from "../invitationsCard";
import LoadMoreData from "../../loaders/loadMoreDataPagination";

const MonetaryGiftCard = ({
  _unqKey,
  countEnd = 0,
  selected,
  listing = [],
  showBorder = true,
  loading = false,
  pageData,
  loadMoreMonetaryGiftHandler = () => {},
}) => {
  return (
    <Fragment key={_unqKey}>
      <div
        className={`md:col-span-1 col-span-3 ${
          showBorder ? "border border-c_D1D1D1" : "border-none"
        } rounded-[21px] overflow-hidden px-2`}
      >
        <Heading
          className={
            "md:text-fs_32 text-fs_32 !text-center !font-outfit_bold leading-[45.36px]"
          }
        >
          {`${labels.invitation} `}
        </Heading>

        <InvitationsCard
          data={selected}
          pageData={{}}
          isLoading={false}
          currentId={""}
          onNextClick={() => {}}
          showMonetaryGiftModal={false}
          setShowMonetaryGiftModal={() => {}}
          totalMonetaryGiftCount={{}}
          footerVisible={false}
          imageCardHeight={"h-[180px]"}
        />

        <div className={"py-4 px-0 mx-3 border border-c_D1D1D1 rounded-2xl"}>
          <div className={"flex items-center justify-between px-4 "}>
            <Heading
              className={
                "md:text-fs_24 text-fs_16 !font-outfit_regular leading-[40px] tracking-[-0.3px]"
              }
            >
              {`${labels?.monetaryGift} `}
              <CountUp
                className={
                  "md:text-fs_24 text-fs_16 !font-outfit_regular leading-[30px] tracking-[-0.3px]"
                }
                duration={2}
                preserveValue={false}
                start={0}
                end={countEnd}
                formattingFn={(val) => `(${val})`}
              />
            </Heading>
          </div>
          <div className={"overflow-y-auto h-[400px] px-4 mr-1 pt-1 pb-0"}>
            {listing?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={"flex items-start justify-start gap-3"}
                >
                  {/* <div className={"w-fit h-fit mt-2.5"}>
                                  <Image
                                    src={ele?.avatar || DefaultAvatar}
                                    width={53}
                                    height={53}
                                    className={
                                      "object-cover !h-[53px] !w-[53px]"
                                    }
                                    alt={"useravatar"}
                                  />
                                </div> */}
                  <div
                    className={
                      "flex flex-1 flex-col py-2 gap-1 items-start justify-between"
                    }
                  >
                    <Paragraph className={"font-outfit_medium md:text-fs_15"}>
                      <Fragment>
                        {item?.name ?? labels.notAvailable}

                        <span
                          className={
                            "!ml-2 !text-c_3C3C43D9 !font-outfit_regular !text-fs_12"
                          }
                        >
                          {`(#${item?.transactionId ?? labels.notAvailable})`}
                        </span>
                      </Fragment>
                    </Paragraph>
                    <Paragraph
                      className={
                        "font-outfit_regular !text-c_9B9B9B md:text-fs_15"
                      }
                    >
                      {item?.description ?? labels.notAvailable}
                    </Paragraph>
                    <Paragraph
                      className={
                        "font-outfit_medium text-c_5466F3 md:text-fs_15"
                      }
                    >
                      {item?.amount
                        ? `${kFormatter(item?.amount)} ${labels.omanCurrency}`
                        : labels.notAvailable}
                    </Paragraph>
                  </div>
                </div>
              );
            })}
          </div>

          {pageData?.currentPage >=
          pageData?.totalPages ? null : pageData?.itemCount > 9 ? (
            <LoadMoreData
              loading={loading}
              label={"Load More"}
              labelClassName={""}
              color={"#66A5C4"}
              height={48}
              width={48}
              onClick={() =>
                loadMoreMonetaryGiftHandler(selected?.invitation_id)
              }
              disabled={
                pageData?.currentPage >= pageData?.totalPages ? true : false
              }
            />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.countEnd === nextProps.countEnd &&
    prevProps.listing === nextProps.listing &&
    prevProps.loading === nextProps.loading
  );
};

export default memo(MonetaryGiftCard, areEqual);
