import React from "react";

export default function Pagination({ totalPages, currentPage }) {
  const handlePageChange = (page) => {
    console.log(
      "🚀 -----------------------------------------------------------🚀"
    );
    console.log("🚀 ~ file: Pagination.js:6 ~ handlePageChange ~ page:", page);
    console.log(
      "🚀 -----------------------------------------------------------🚀"
    );
  };

  const renderPaginationItems = () => {
    const items = [];

    const min = Math.max(1, currentPage - 4);
    const max = Math.min(min + 7, totalPages);

    for (let i = min; i <= max; i++) {
      if (i === currentPage) {
        items.push(
          <li key={i}>
            <a className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
              {i}
            </a>
          </li>
        );
      } else {
        items.push(
          <li key={i}>
            <a
              className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              href={handlePageChange(i)}
            >
              {i}
            </a>
          </li>
        );
      }
    }

    if (min > 1) {
      items.unshift(
        <li key="leftEllipsis">
          <a className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            ...
          </a>
        </li>
      );
    }

    if (max < totalPages) {
      items.push(
        <li key="rightEllipsis">
          <a className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            ...
          </a>
        </li>
      );
    }

    return items;
  };

  return (
    <div className="flex justify-center my-10 pagination">
      {totalPages > 0 && (
        <nav aria-label="Page navigation example">
          <ul className="inline-flex items-center -space-x-px">
            {/* FIRST ITEM */}
            {currentPage !== 1 ? (
              <li>
                <a
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href={`/?page=1`}
                  onClick={() => handlePageChange(1)}
                >
                  First
                </a>
              </li>
            ) : (
              <li>
                <a
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  First
                </a>
              </li>
            )}
            {renderPaginationItems()}
            {currentPage !== totalPages && (
              <li>
                <a
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href={`/?page=${totalPages}`}
                  onClick={() => handlePageChange(totalPages)}
                >
                  Last
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
