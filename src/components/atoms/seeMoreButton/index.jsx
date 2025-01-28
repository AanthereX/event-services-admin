/** @format */

const SeeMoreButton = ({
  label = "See More",
  containerClassName = "",
  svgClassName = "",
  btnClassName = "",
  labelClassName = "",
  onClick = () => {},
}) => {
  return (
    <div class={`flex items-center justify-center ${containerClassName}`}>
      <div class={"relative group"}>
        <button
          onClick={onClick}
          class={`relative inline-block p-px font-outfit_medium leading-[16px] text-white bg-c_primary shadow-sm cursor-pointer rounded-full shadow-c_primary transition-transform duration-300 ease-in-out hover:scale-[1.02] active:scale-95 ${btnClassName}`}
        >
          <span
            class={
              "absolute inset-0 rounded-full bg-gradient-to-r from-c_66A5C4 via-c_primary to-c_5669FF33 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            }
          ></span>

          <span
            class={"relative z-10 block px-3 py-1 rounded-full bg-c_primary"}
          >
            <div
              class={"relative z-10 flex items-center justify-center space-x-2"}
            >
              <span
                class={`transition-all text-fs_13 whitespace-nowrap duration-500 group-hover:translate-x-1 ${labelClassName}`}
              >
                {label}
              </span>
              <svg
                class={`!w-4 !h-4 transition-transform duration-500 group-hover:translate-x-1 ${svgClassName}`}
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SeeMoreButton;
