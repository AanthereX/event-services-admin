/** @format */

import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const generateColumns = (data, columnHelper) => {
  if (!data || !data.length) return [];

  // Extract keys from the first object in the data array
  const keys = Object.keys(data[0]);

  // Generate columns based on keys
  return keys.map((key) => {
    return columnHelper.accessor(key, {
      header: () => <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>,
      cell: (info) => {
        const value = info.getValue();

        return typeof value === "object" && value !== null
          ? JSON.stringify(value)
          : value;
      },
      footer: (info) => info.column.id,
    });
  });
};

const TableRenderer = ({ data }) => {
  const columnHelper = createColumnHelper();

  // Generate columns dynamically based on the data provided
  const columns = generateColumns(data, columnHelper);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 50,
      maxSize: 900,
    },
  });

  return (
    <div className='overflow-x-auto p-2'>
      <table className='min-w-full'>
        <thead className={"bg-c_F8F8F8 border-none !h-[48px]"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  scope={"col"}
                  className={`py-3 ${
                    idx === 0 ? "px-8" : "px-4"
                  } text-left text-fs_12 leading-[15px] font-outfit_regular text-c_454545 capitalize`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-b'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='px-4 py-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRenderer;
