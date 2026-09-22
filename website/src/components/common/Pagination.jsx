import React, { memo, useCallback, useMemo } from "react";
import Button from "./Button";

const BTN_STYLE = {
  width: 28,
  height: 28,
  minWidth: 28,
  border: "1px solid var(--tertiary, #ececec)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  transition: "all 0.2s ease",
};

const Pagination = memo(
  ({
    page = 1,
    totalItems = 0,
    itemsPerPage = 10,
    onPageChange,
    itemName = "items",
    className = "",
    style = {},
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);

    if (totalItems === 0) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handlePageChange = useCallback(
      (pNum) => {
        if (pNum >= 1 && pNum <= totalPages && pNum !== currentPage) {
          onPageChange?.(pNum);
        }
      },
      [currentPage, totalPages, onPageChange]
    );

    const pages = useMemo(() => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      if (currentPage <= 3) {
        return [1, 2, 3, 4, "...", totalPages];
      }
      if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      }
      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }, [currentPage, totalPages]);

    return (
      <div className={`bg-white border-tertiary mt-4 w-full rounded-5 ${className}`} style={style}>
        <div className="flex items-center justify-between p-10">
          <p className="text-gray mini-text">
            Showing {startItem} to {endItem} of {totalItems} {itemName}
          </p>
          <div className="flex items-center gap-4">
            <Button
              version="icon"
              bg="forth"
              color="gray"
              text="«"
              title="First Page"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(1)}
              style={BTN_STYLE}
            />
            <Button
              version="icon"
              bg="forth"
              color="gray"
              text="‹"
              title="Previous Page"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              style={BTN_STYLE}
            />

            {pages.map((pNum, index) =>
              pNum === "..." ? (
                <span key={`ellipsis-${index}`} className="text-gray px-4 mini-text font-500">
                  ...
                </span>
              ) : (
                <Button
                  key={pNum}
                  version="icon"
                  bg={currentPage === pNum ? "primary" : "white"}
                  color={currentPage === pNum ? "white" : "gray"}
                  text={String(pNum)}
                  onClick={() => handlePageChange(pNum)}
                  style={BTN_STYLE}
                />
              )
            )}

            <Button
              version="icon"
              bg="forth"
              color="gray"
              text="›"
              title="Next Page"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              style={BTN_STYLE}
            />
            <Button
              version="icon"
              bg="forth"
              color="gray"
              text="»"
              title="Last Page"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(totalPages)}
              style={BTN_STYLE}
            />
          </div>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
