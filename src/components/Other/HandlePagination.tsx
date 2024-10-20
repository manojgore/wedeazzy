"use client";

// import React from 'react';
// import ReactPaginate from 'react-paginate';

// interface Props {
//     pageCount: number
//     onPageChange: (selected: number) => void;
// }

// const HandlePagination: React.FC<Props> = ({ pageCount, onPageChange }) => {
//     return (
//         <ReactPaginate
//             previousLabel="<"
//             nextLabel=">"
//             pageCount={pageCount}
//             pageRangeDisplayed={3}
//             marginPagesDisplayed={2}
//             onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
//             containerClassName={'pagination'}
//             activeClassName={'active'}
//         />
//     );
// };

// export default HandlePagination;
import React from "react";
import ReactPaginate from "react-paginate";

interface Props {
  pageCount: number;
  currentPage: number; // Add currentPage to props
  onPageChange: (selected: number) => void;
}

const HandlePagination: React.FC<Props> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 0) return null; // Return null if no pages to display

  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
      containerClassName={"pagination flex justify-center items-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={`previous-item ${currentPage === 0 ? "disabled" : ""}`} // Disable if on first page
      nextClassName={`next-item ${
        currentPage === pageCount - 1 ? "disabled" : ""
      }`} // Disable if on last page
      previousLinkClassName={`arrow-link`}
      nextLinkClassName={`arrow-link`}
      activeClassName={"active"}
      disabledClassName={"disabled"} // Style for disabled buttons
    />
  );
};

export default HandlePagination;
