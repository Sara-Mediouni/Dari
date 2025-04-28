export function PaginationDemo({ currentPage, totalPages, handleNextPage, handlePrevPage, handlePageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
  }

  return (
      <div className="flex space-x-1 m-20">
          {/* Bouton "Prev" */}
          <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
V              className="min-w-9 hover:text-white rounded-full border border-slate300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-green-700
               hover:bg-green-700 hover:border-green-700 focus:text-white focus:bg-green-700 focus:border-green-700 active:border-green-700 active:text-white active:bg-green-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
              Prev
          </button>

          {/* Affichage des numéros de pages dynamiquement */}
          {pageNumbers.map((pageNumber) => (
              <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)} // Cette fonction doit gérer la mise à jour de `currentPage`
                  className={`min-w-9 rounded-full py-2 px-3.5 text-center text-sm transition-all shadow-sm ${
                      currentPage === pageNumber
                          ? "bg-green-700 text-white"
                          : "border border-stone300 text-stone300 hover:text-green900 hover:bg-stone300 "
                  }`}
              >
                  {pageNumber}
              </button>
          ))}

          {/* Bouton "Next" */}
          <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="min-w-9 hover:text-white rounded-full border border-slate300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-green-700
               hover:bg-green-700 hover:border-green-700 focus:text-white focus:bg-green-700 focus:border-green-700 active:border-green-700 active:text-white active:bg-green-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
              Next
          </button>
      </div>
  );
}
