/** @format */

import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = ({
  loading,
  children,
  width,
  height,
  borderRadius,
  isCircle = false,
  ...props
}) => {
  return (
    <Fragment>
      {loading ? (
        <Skeleton
          width={width}
          height={height}
          duration={2}
          enableAnimation={true}
          borderRadius={borderRadius}
          circle={isCircle}
          {...props}
        />
      ) : (
        <>{children}</>
      )}
    </Fragment>
  );
};

export default SkeletonLoader;
