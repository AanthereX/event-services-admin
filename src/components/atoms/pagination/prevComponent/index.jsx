/** @format */

import { Icons } from "../../../../assets/icons";
import labels from "../../../../locale";
import Image from "../../image";

const PrevComponent = () => {
  const { prevPageIcon } = Icons;
  return (
    <div
      className={
        "bg-c_F4F4F4 border border-c_E9E9E9 rounded cursor-pointer py-2 px-3 flex items-center justify-center gap-x-[8px] mr-5"
      }
    >
      <Image src={prevPageIcon} alt={"previcon"} />
      <span
        className={
          "text-c_313131 capitalize text-fs_14 leading-[20px] font-outfit_regular"
        }
      >
        {labels.back}
      </span>
    </div>
  );
};

export default PrevComponent;
