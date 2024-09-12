import React from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

interface PaginationProps {
  pageState: { page: number; total: number };
  totalPages: number;
  setPageState: (state: { page: number }) => void;
  label: string;
}

const Pagination: React.FC<PaginationProps> = ({
  pageState,
  totalPages,
  setPageState,
  label,
}) => {
  return (
    <>
      {totalPages > 0 && (
        <div className="mt-4 flex flex-col gap-2 justify-center items-center pb-[6rem] lg:pb-0">
          <div className="mt-2">{label}</div>
          <div className="mb-12">
            <button
              onClick={() =>
                setPageState({ page: Math.max(1, pageState.page - 1) })
              }
              disabled={pageState.page === 1}
              className="px-3 py-2 font-bold border rounded-md"
            >
              <MdOutlineNavigateBefore />
            </button>
            <span className="ml-2">
              {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPageState({ page: pageNumber })}
                    className={`py-2 px-3 rounded-md border ${
                      pageNumber === pageState.page
                        ? "bg-[#E4E3FF] text-primary"
                        : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {totalPages > 6 && <span className="px-3 py-2">...</span>}
            </span>
            <button
              onClick={() =>
                setPageState({ page: Math.min(totalPages, pageState.page + 1) })
              }
              disabled={pageState.page === totalPages}
              className="px-3 py-2 ml-2 font-bold border rounded-md"
            >
              <MdOutlineNavigateNext />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
