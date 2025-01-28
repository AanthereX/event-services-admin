/** @format */

import Paragraph from "../../atoms/paragraph";
import { Icons } from "../../../assets/icons";
import labels from "../../../locale";
import Button from "../../atoms/button";
import { CardTypes } from "../../../constants";
import { kFormatter } from "../../../utils";
const { ChevronRightLight } = Icons;

const InvitationsCard = ({
  _unqkey,
  data,
  onNextClick,
  pageData,
  isLoading = false,
  footerVisible = true,
  headingClassname = "",
  containerClassname = "",
  locationHeadingClassname = "",
  iconsTextClassname = "",
  showMonetaryGiftModal,
  setShowMonetaryGiftModal = () => {},
  imageCardHeight = "!h-[150px]",
  totalMonetaryGiftCount,
}) => {
  return (
    <div
      key={_unqkey}
      className={`p-3 rounded-[14px] ${
        footerVisible ? "border-c_E4DFDF border" : ""
      }`}
    >
      <div
        style={{
          backgroundImage: `url(${data?.invitation_image})`,
        }}
        className={`${
          data?.invitation_type === CardTypes.UPLOAD
            ? `bg-cover bg-no-repeat bg-center !w-full ${imageCardHeight} p-0`
            : `bg-cover bg-no-repeat bg-center !w-full ${imageCardHeight} p-0`
        } text-white rounded-[14px] ${containerClassname}`}
      ></div>
      {footerVisible ? (
        <div className={"flex items-center gap-1 justify-between pt-3"}>
          <div className={"flex items-center gap-2"}>
            <Paragraph
              className={"text-fs_16 mb-2 font-outfit_medium md:text-fs_16"}
            >
              {labels.totalMonetaryGifts}
            </Paragraph>
            <Paragraph
              className={
                "text-fs_16 mb-2 font-outfit_medium md:text-fs_16 text-c_primary"
              }
            >
              {!!data?.amount
                ? `${kFormatter(data?.amount)} ${labels.omanCurrency}`
                : 0}
            </Paragraph>
          </div>
          <Button
            disabled={
              !data?.amount ||
              (isLoading &&
                data?.invitation_id === showMonetaryGiftModal?.invitation_id)
            }
            onClick={() => {
              setShowMonetaryGiftModal({
                ...data,
              });
              onNextClick(1, data?.invitation_id);
            }}
            title={<img src={ChevronRightLight} alt={"right-arrow-icon"} />}
            img={ChevronRightLight}
            isLoading={
              isLoading &&
              data?.invitation_id === showMonetaryGiftModal?.invitation_id
            }
            imgClassName={"!w-[14px] !h-[14px]"}
            className={`!w-8 !h-8 flex items-center bg-c_primary justify-center mb-1`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default InvitationsCard;
