/** @format */

import { Fragment } from "react";
import { ThreeCircles } from "react-loader-spinner";

const ApiLoader = ({ block = false, children }) => {
  if (block) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <Fragment>
      <div className='relative'>
        {!!block ? (
          <div
            className={
              "min-h-[200px] flex justify-center items-center cursor-loading"
            }
          >
            <ThreeCircles
              height={160}
              width={50}
              color={"#66A5C4"}
              ariaLabel={"three-circles-loading"}
              wrapperStyle={{}}
              wrapperClass={""}
              visible={true}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </Fragment>
  );
};

export default ApiLoader;
