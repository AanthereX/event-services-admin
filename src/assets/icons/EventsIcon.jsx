/** @format */

import { Fragment } from "react";

const EventsIcon = ({ color, width = 16, height = 17 }) => {
  return (
    <Fragment>
      <svg
        width={width}
        height={height}
        viewBox='0 0 16 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10.2436 14C9.70835 14 9.25404 13.8133 8.88071 13.44C8.50737 13.0665 8.32071 12.6122 8.32071 12.0769C8.32071 11.5416 8.50737 11.0873 8.88071 10.714C9.25404 10.3406 9.70835 10.154 10.2436 10.154C10.7789 10.154 11.2333 10.3406 11.6067 10.714C11.9801 11.0873 12.1667 11.5416 12.1667 12.0769C12.1667 12.6122 11.9801 13.0665 11.6067 13.44C11.2333 13.8133 10.7789 14 10.2436 14ZM2.42321 16.9167C2.00223 16.9167 1.64591 16.7708 1.35425 16.4792C1.06258 16.1875 0.916748 15.8312 0.916748 15.4102V4.25647C0.916748 3.8355 1.06258 3.47918 1.35425 3.18751C1.64591 2.89585 2.00223 2.75001 2.42321 2.75001H3.57696V0.987305H4.85904V2.75001H11.1732V0.987305H12.4232V2.75001H13.577C13.9979 2.75001 14.3542 2.89585 14.6459 3.18751C14.9376 3.47918 15.0834 3.8355 15.0834 4.25647V15.4102C15.0834 15.8312 14.9376 16.1875 14.6459 16.4792C14.3542 16.7708 13.9979 16.9167 13.577 16.9167H2.42321ZM2.42321 15.6667H13.577C13.6411 15.6667 13.6999 15.6399 13.7532 15.5865C13.8067 15.5331 13.8334 15.4744 13.8334 15.4102V7.5898H2.16675V15.4102C2.16675 15.4744 2.19348 15.5331 2.24696 15.5865C2.30029 15.6399 2.35904 15.6667 2.42321 15.6667ZM2.16675 6.3398H13.8334V4.25647C13.8334 4.1923 13.8067 4.13355 13.7532 4.08022C13.6999 4.02675 13.6411 4.00001 13.577 4.00001H2.42321C2.35904 4.00001 2.30029 4.02675 2.24696 4.08022C2.19348 4.13355 2.16675 4.1923 2.16675 4.25647V6.3398Z'
          fill={color}
        />
      </svg>
    </Fragment>
  );
};

export default EventsIcon;
