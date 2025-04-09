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
              className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-stone300 hover:text-green900 hover:bg-stone300 hover:border-slate-800
               focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-stone300 active:text-stone300 active:bg-green900 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
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
                          ? "bg-slate-800 text-white"
                          : "border border-stone300 text-stone300 hover:text-green900 hover:bg-stone300 hover:border-green900"
                  }`}
              >
                  {pageNumber}
              </button>
          ))}

          {/* Bouton "Next" */}
          <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="min-w-9 hover:text-green900 rounded-full border border-slate300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 
               hover:bg-stone300 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
              Next
          </button>
      </div>
  );
}
