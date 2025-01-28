/** @format */

import Rating from "react-rating";
import Paragraph from "../../atoms/paragraph";

const StarRating = ({
  emptyIcon,
  fillIcon,
  ratingFraction = 2,
  totalStar = 1,
  rating = 1,
  readOnly = true,
  containerPadding = "px-3",
  showRatingAvg = true,
  showBracketsAroundValue = true,
  valueClassname = "",
  ...rest
}) => {
  return (
    <div
      className={`flex items-center justify-start gap-2 ${containerPadding}`}
    >
      <Rating
        emptySymbol={
          <svg
            width='19'
            height='17'
            viewBox='0 0 19 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.5 0.993444L12.0282 5.33414C12.1695 5.57674 12.4063 5.74877 12.6807 5.80819L17.5902 6.87133L14.2432 10.6172C14.0562 10.8265 13.9657 11.1049 13.994 11.3842L14.5 16.3819L9.90325 14.3563C9.64634 14.2431 9.35366 14.2431 9.09675 14.3563L4.49997 16.3819L5.00599 11.3842C5.03427 11.1049 4.94383 10.8265 4.75677 10.6172L1.40979 6.87133L6.3193 5.80819C6.59369 5.74877 6.83047 5.57675 6.97177 5.33414L9.5 0.993444Z'
              stroke='#DFB200'
            />
          </svg>
        }
        fullSymbol={
          <svg
            width='19'
            height='17'
            viewBox='0 0 19 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.06794 0.741795C9.26081 0.410661 9.73919 0.410661 9.93206 0.741794L12.4603 5.08249C12.5309 5.20379 12.6493 5.28981 12.7865 5.31952L17.696 6.38266C18.0706 6.46376 18.2184 6.91872 17.9631 7.20448L14.6161 10.9503C14.5225 11.055 14.4773 11.1942 14.4915 11.3338L14.9975 16.3316C15.0361 16.7128 14.6491 16.994 14.2984 16.8395L9.70162 14.8138C9.57317 14.7572 9.42683 14.7572 9.29838 14.8138L4.7016 16.8395C4.35093 16.994 3.96391 16.7128 4.00252 16.3316L4.50853 11.3338C4.52268 11.1942 4.47746 11.055 4.38392 10.9503L1.03694 7.20448C0.781612 6.91872 0.929438 6.46376 1.30396 6.38266L6.21348 5.31952C6.35068 5.28981 6.46906 5.20379 6.53972 5.08249L9.06794 0.741795Z'
              fill='#DFB300'
            />
          </svg>
        }
        stop={totalStar}
        fractions={ratingFraction}
        initialRating={rating}
        readonly={readOnly}
        {...rest}
      />
      {!!showRatingAvg && (
        <Paragraph
          className={`!text-fs_14 !font-outfit_medium !text-c_121212 !leading-[17.6px] ${valueClassname}`}
        >
          {!!showBracketsAroundValue
            ? `(${rating.toFixed(1)})`
            : `${rating.toFixed(1)}`}
        </Paragraph>
      )}
    </div>
  );
};

export default StarRating;
