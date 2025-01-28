/** @format */

import { Icons } from "../../../../assets/icons";
import labels from "../../../../locale";
import Image from "../../image";

const NextComponent = () => {
  const { nextPageIcon } = Icons;
  return (
    <div
      className={
        "bg-c_F4F4F4 border border-c_E9E9E9 rounded cursor-pointer py-2 px-3 flex items-center justify-center gap-x-[8px] ml-5"
      }
    >
      <span
        className={
          "text-c_313131 capitalize text-fs_14 leading-[20px] font-outfit_regular"
        }
      >
        {labels.next}
      </span>
      <Image src={nextPageIcon} alt={"nexticon"} />
    </div>
  );
};

export default NextComponent;
