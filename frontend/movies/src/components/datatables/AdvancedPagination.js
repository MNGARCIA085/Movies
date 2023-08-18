import React, { useState } from 'react';




function AdvancedPagination({ currentPage, itemsPerPage, totalPages,onPageChange }) {
  
  const getPageNumbers = () => {
    const maxDisplayedPages = 5; // Cantidad máxima de números de página mostrados
    const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);

    let startPage = Math.max(1, currentPage - halfDisplayedPages);
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <ul className="pagination">
      <li
        onClick={() => onPageChange(currentPage - 1)}
        className={currentPage === 1 ? 'disabled' : ''}
      >
        <button className="btn btn-sm btn-secondary">Anterior</button>&nbsp;
      </li>
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          <button className="btn btn-sm btn-primary">{pageNumber}</button>&nbsp;
        </li>
      ))}
      <li
        onClick={() => onPageChange(currentPage + 1)}
        className={currentPage === totalPages ? 'disabled' : ''}
      >
        <button className="btn btn-sm btn-secondary">Siguiente</button>
      </li>
    </ul>
  );
}

export default AdvancedPagination;
