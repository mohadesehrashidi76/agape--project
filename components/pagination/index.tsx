import { PaginationProps } from "@/types/project";
import React from "react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-end items-center mt-4 md:w-[86%] w-[93%]">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 mx-1 bg-temcolor rounded disabled:opacity-50 text-white"
      >
        {`<`}
      </button>
      <span className="mx-2">
        صفحه {currentPage} از {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 mx-1 bg-temcolor rounded disabled:opacity-50 text-white"
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
