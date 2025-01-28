/** @format */

import { Fragment } from "react";

const TransactionHistoryIcon = ({ color, width = 16, height = 16 }) => {
  return (
    <Fragment>
      <svg
        width={width}
        height={height}
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.00008 15.9168C2.41786 15.9168 1.92508 15.7151 1.52175 15.3118C1.11841 14.9084 0.916748 14.4169 0.916748 13.8372V11.7501H3.41675V0.243652L4.57071 1.2374L5.7405 0.243652L6.91029 1.2374L8.08029 0.243652L9.25008 1.2374L10.4199 0.243652L11.5899 1.2374L12.7597 0.243652L13.9295 1.2374L15.0834 0.243652V13.8334C15.0834 14.4157 14.8817 14.9084 14.4784 15.3118C14.0751 15.7151 13.5823 15.9168 13.0001 15.9168H3.00008ZM13.0001 14.6668C13.2362 14.6668 13.4341 14.5869 13.5938 14.4272C13.7536 14.2675 13.8334 14.0696 13.8334 13.8334V2.16678H4.66675V11.7501H12.1667V13.8334C12.1667 14.0696 12.2466 14.2675 12.4063 14.4272C12.5661 14.5869 12.764 14.6668 13.0001 14.6668ZM5.66029 5.29178V4.04178H10.3878V5.29178H5.66029ZM5.66029 7.79178V6.54178H10.3878V7.79178H5.66029ZM12.1186 5.40386C11.9146 5.40386 11.7407 5.33205 11.597 5.18844C11.4533 5.04469 11.3815 4.87081 11.3815 4.66678C11.3815 4.46275 11.4533 4.28886 11.597 4.14511C11.7407 4.0015 11.9146 3.92969 12.1186 3.92969C12.3227 3.92969 12.4965 4.0015 12.6403 4.14511C12.784 4.28886 12.8559 4.46275 12.8559 4.66678C12.8559 4.87081 12.784 5.04469 12.6403 5.18844C12.4965 5.33205 12.3227 5.40386 12.1186 5.40386ZM12.1186 7.90386C11.9146 7.90386 11.7407 7.83206 11.597 7.68844C11.4533 7.54469 11.3815 7.37081 11.3815 7.16678C11.3815 6.96275 11.4533 6.78886 11.597 6.64511C11.7407 6.5015 11.9146 6.42969 12.1186 6.42969C12.3227 6.42969 12.4965 6.5015 12.6403 6.64511C12.784 6.78886 12.8559 6.96275 12.8559 7.16678C12.8559 7.37081 12.784 7.54469 12.6403 7.68844C12.4965 7.83206 12.3227 7.90386 12.1186 7.90386ZM3.00008 14.6668H10.9167V13.0001H2.16675V13.8334C2.16675 14.0696 2.24661 14.2675 2.40633 14.4272C2.56605 14.5869 2.76397 14.6668 3.00008 14.6668Z'
          fill={color}
        />
      </svg>
    </Fragment>
  );
};

export default TransactionHistoryIcon;
