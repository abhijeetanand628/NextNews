const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    if (totalPages <= 1) {
        return null
    }

    const pages = []

    // Show 3 pages at a time
    let startPage = Math.max(1, currentPage - 1)
    let endPage = Math.min(totalPages, startPage + 2)

    // If we're near the end
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2)
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }

    return (
        <div className='flex justify-center items-center gap-4 mt-12'>

            {/* PREV */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className='px-5 py-3 border border-gray-400 rounded-xl
                hover:bg-gray-100
                disabled:text-gray-400
                disabled:border-gray-300
                disabled:cursor-not-allowed
                cursor-pointer'
            >
                Prev
            </button>

            {/* PAGE NUMBERS */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-12 h-12 rounded-xl border cursor-pointer transition
                    ${
                        currentPage === page
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                >
                    {page}
                </button>

            ))}

            {/* NEXT */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className='px-5 py-3 border border-gray-400 rounded-xl
                hover:bg-gray-100
                disabled:text-gray-400
                disabled:border-gray-300
                disabled:cursor-not-allowed
                cursor-pointer'
            >
                Next
            </button>
        </div>
    )
}

export default Pagination