/** @format */

import { useRef } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Icons } from "../../../assets/icons";
import ReactPaginate from "react-paginate";
import Image from "../../atoms/image";
import Paragraph from "../../atoms/paragraph";
import NextComponent from "../../atoms/pagination/nextComponent";
import PrevComponent from "../../atoms/pagination/prevComponent";
/**
 * Renders a table component with pagination and loading state.
 *
 * @param {Object} props - The properties of the table component.
 * @param {boolean} props.loading - Indicates if the table is in a loading state.
 * @param {Array} props.listData - The data to be rendered in the table.
 * @param {Function} props.renderItem - The function to render each item in the table.
 * @param {Array} props.headers - The headers of the table.
 * @param {Function} props.renderHeader - The function to render the table header.
 * @param {string} props.headerClassName - The class name for the table header.
 * @param {Object} props.pageData - The data for pagination.
 * @param {Function} props.getData - The function to get data for pagination.
 * @param {string} props.errorTitle - The title to be displayed in case of an error.
 * @return {JSX.Element} The rendered table component.
 */
const Table = ({
  loading,
  loaderContainerClassName = "",
  listData,
  renderItem,
  headers,
  renderHeader,
  headerClassName = "",
  pageData,
  getData,
  tableClassName,
  errorTitle,
  notFoundTitle,
  notFoundDescription,
  firstColWidthFull = false,
  showHeaderCellPadding = true,
  headerBgTransparent = false,
  tableVerticalMargin = "my-6",
  paddingFirstCell = "px-8",
}) => {
  const paginateRef = useRef(null);
  /**
   * Handles the page click event.
   *
   * @param {Object} event - The event object containing the selected page.
   * @return {void} This function does not return a value.
   */
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    getData && getData(selectedPage + 1, pageData?.itemsPerPage);
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table
          className={`w-full table-responsive !text-c_202224 ${tableVerticalMargin} bg-white overflow-hidden border-c_B9B9B9 border-collapse ${tableClassName}`}
        >
          <thead className={"w-full"}>
            {renderHeader ? (
              renderHeader
            ) : (
              <tr
                className={`${
                  !!headerBgTransparent ? "bg-none" : "bg-c_F8F8F8"
                } !rounded-[14px]`}
              >
                {headers?.map((item, index) => (
                  <th
                    key={index}
                    scope={"col"}
                    className={`${
                      !!showHeaderCellPadding && index === 0
                        ? `${paddingFirstCell}`
                        : !!showHeaderCellPadding
                        ? "px-3"
                        : ""
                    } ${
                      !!firstColWidthFull ? "w-full" : ""
                    } py-3.5 pr-4 text-c_454545 text-xs capitalize font-outfit_regular ${headerClassName}`}
                  >
                    <div
                      className={
                        "flex items-center gap-2 text-xs truncate capitalize font-outfit_regular"
                      }
                    >
                      {item}
                    </div>
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody className="w-full">
            {!!loading ? (
              <tr className="">
                <td colSpan={headers.length} className={""}>
                  <div
                    className={`flex justify-center items-center px-5 py-0 pt-0 pb-40 h-screen ${loaderContainerClassName}`}
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
                </td>
              </tr>
            ) : listData?.length === 0 || !listData ? (
              <tr>
                <td colSpan={headers.length} className={"h-96"}>
                  <div className="flex justify-center items-center mt-20 p-5">
                    <div className="flex flex-col items-center">
                      <Image
                        src={Icons.NotFound}
                        alt={"List is Empty Image"}
                        className={"h-[135px] w-[256px]"}
                      />
                      <Paragraph
                        className={
                          "!font-outfit_semiBold !text-c_202224 !text-fs_32 !mt-8 !mb-7"
                        }
                      >
                        {notFoundTitle}
                      </Paragraph>
                      <Paragraph
                        className={
                          "!text-center !mx-auto !w-[36ch] !font-outfit_regular !text-fs_14 !text-c_0000005C"
                        }
                      >
                        {notFoundDescription}
                      </Paragraph>
                    </div>
                  </div>
                </td>
              </tr>
            ) : Array.isArray(listData) ? (
              listData?.map((item, index) =>
                renderItem(item, index, pageData?.currentPage),
              )
            ) : null}
          </tbody>
        </table>
      </div>

      {pageData?.itemCount > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<NextComponent />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          ref={paginateRef}
          pageCount={pageData?.totalPages}
          previousLabel={<PrevComponent />}
          renderOnZeroPageCount={null}
          activeClassName={"!bg-[#66A5C4] !select-none !text-white"}
          pageClassName={
            "!w-8 !h-8 rounded-md bg-white p-1 text-center !text-c_202224 font-outfit_regular"
          }
          breakClassName={"!text-c_202224 font-outfit_regular"}
          containerClassName={
            "pt-5 pb-8 !select-none flex gap-2 justify-center items-center !text-c_202224 font-outfit_regular"
          }
          previousClassName={
            "bg-white p-1 rounded-md w-fit text-center outline-none !text-c_202224 font-outfit_regular"
          }
          nextClassName={
            "bg-white p-1 rounded-md w-fit text-center outline-none !text-c_202224 font-outfit_regular"
          }
        />
      )}
    </>
  );
};

export default Table;
