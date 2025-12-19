import React from 'react';

function Pagination({ resultsPerPage, totalResults, paginate, currentPage }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Calculer la plage de pages à afficher (max 5 pages visibles)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Ajuster si on est au début ou à la fin
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="mt-12 flex items-center justify-center">
      <div className="join">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="join-item btn btn-outline btn-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Précédent
        </button>

        {/* First Page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => paginate(1)}
              className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-primary' : 'btn-outline'}`}
            >
              1
            </button>
            {startPage > 2 && (
              <button className="join-item btn btn-sm btn-disabled">...</button>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`join-item btn btn-sm ${
              currentPage === number ? 'btn-primary' : 'btn-outline'
            }`}
          >
            {number}
          </button>
        ))}

        {/* Last Page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <button className="join-item btn btn-sm btn-disabled">...</button>
            )}
            <button
              onClick={() => paginate(totalPages)}
              className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-primary' : 'btn-outline'}`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="join-item btn btn-outline btn-sm"
        >
          Suivant
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page Info */}
      <div className="hidden sm:block ml-6 text-sm text-gray-600">
        Page {currentPage} sur {totalPages}
      </div>
    </nav>
  );
}

export default Pagination;