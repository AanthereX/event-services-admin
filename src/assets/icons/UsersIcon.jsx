/** @format */

import { Fragment } from "react";

const UsersIcon = ({ color = "", width = 18, height = 14 }) => {
  return (
    <Fragment>
      <svg
        width={width}
        height={height}
        viewBox='0 0 18 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.498535 13.0897V11.237C0.498535 10.8076 0.609368 10.4243 0.831035 10.0872C1.0527 9.75016 1.34874 9.48793 1.71916 9.30057C2.5111 8.91321 3.30742 8.61453 4.10812 8.40453C4.90895 8.19467 5.78902 8.08974 6.74833 8.08974C7.70777 8.08974 8.58784 8.19467 9.38854 8.40453C10.1894 8.61453 10.9858 8.91321 11.7777 9.30057C12.1481 9.48793 12.4442 9.75016 12.6658 10.0872C12.8875 10.4243 12.9983 10.8076 12.9983 11.237V13.0897H0.498535ZM14.665 13.0897V11.1345C14.665 10.5876 14.5311 10.0663 14.2633 9.57057C13.9954 9.07502 13.6154 8.64981 13.1233 8.29495C13.6821 8.37828 14.2126 8.50724 14.7148 8.68182C15.2169 8.85655 15.696 9.063 16.1523 9.3012C16.5828 9.53092 16.9153 9.80168 17.1498 10.1135C17.3842 10.4252 17.5015 10.7655 17.5015 11.1345V13.0897H14.665ZM6.74833 6.74349C5.94624 6.74349 5.25965 6.45793 4.68854 5.88682C4.11742 5.31557 3.83187 4.62891 3.83187 3.82682C3.83187 3.02474 4.11742 2.33814 4.68854 1.76703C5.25965 1.19578 5.94624 0.910156 6.74833 0.910156C7.55041 0.910156 8.23708 1.19578 8.80833 1.76703C9.37944 2.33814 9.665 3.02474 9.665 3.82682C9.665 4.62891 9.37944 5.31557 8.80833 5.88682C8.23708 6.45793 7.55041 6.74349 6.74833 6.74349ZM13.9437 3.82682C13.9437 4.62891 13.6582 5.31557 13.0871 5.88682C12.516 6.45793 11.8294 6.74349 11.0273 6.74349C10.9333 6.74349 10.8136 6.7328 10.6683 6.71141C10.5229 6.69002 10.4033 6.66654 10.3094 6.64099C10.638 6.24585 10.8905 5.80752 11.0671 5.32599C11.2435 4.84446 11.3317 4.34446 11.3317 3.82599C11.3317 3.30738 11.2417 2.80925 11.0617 2.33161C10.8817 1.85411 10.6309 1.41453 10.3094 1.01286C10.429 0.970087 10.5486 0.942309 10.6683 0.929531C10.7879 0.916614 10.9076 0.910156 11.0273 0.910156C11.8294 0.910156 12.516 1.19578 13.0871 1.76703C13.6582 2.33814 13.9437 3.02474 13.9437 3.82682ZM1.74833 11.8397H11.7483V11.237C11.7483 11.063 11.7048 10.9081 11.6177 10.7724C11.5308 10.6368 11.3927 10.5181 11.2035 10.4166C10.5177 10.063 9.81152 9.79509 9.08499 9.61287C8.35847 9.43078 7.57958 9.33974 6.74833 9.33974C5.91722 9.33974 5.1384 9.43078 4.41187 9.61287C3.68534 9.79509 2.97916 10.063 2.29333 10.4166C2.10416 10.5181 1.96604 10.6368 1.87895 10.7724C1.79187 10.9081 1.74833 11.063 1.74833 11.237V11.8397ZM6.74833 5.49349C7.20666 5.49349 7.59902 5.3303 7.92541 5.00391C8.2518 4.67752 8.41499 4.28516 8.41499 3.82682C8.41499 3.36849 8.2518 2.97613 7.92541 2.64974C7.59902 2.32335 7.20666 2.16016 6.74833 2.16016C6.28999 2.16016 5.89763 2.32335 5.57124 2.64974C5.24486 2.97613 5.08166 3.36849 5.08166 3.82682C5.08166 4.28516 5.24486 4.67752 5.57124 5.00391C5.89763 5.3303 6.28999 5.49349 6.74833 5.49349Z'
          fill={color}
        />
      </svg>
    </Fragment>
  );
};

export default UsersIcon;
