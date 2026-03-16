import React from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    onLimitChange
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }
        return rangeWithDots;
    };

    const pages = getVisiblePages();

    const btnBase = "h-9 min-w-[36px] flex items-center justify-center border border-gray-300 text-sm transition-all";
    const btnActive = "bg-[#8bbff9] text-white border-[#8bbff9] z-10 font-bold"; 
    const btnInactive = "bg-white text-gray-600 hover:bg-gray-50";
    const btnArrow = "bg-[#8bbff9] text-white border-[#8bbff9] disabled:bg-blue-100 disabled:border-blue-100";

    return (
        <div className="flex items-center justify-start gap-4 py-2 px-1 font-sans">

            <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Items:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:border-blue-400 bg-white cursor-pointer"
                >
                    {[5, 10, 20, 50].map(v => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center -space-x-px rounded-md overflow-hidden">

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${btnBase} ${btnArrow} rounded-l-md`}
                >
                    <span className="text-lg font-bold">{"<"}</span>
                </button>

                {pages.map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={page === '...'}
                        className={`
                            ${btnBase} 
                            ${page === currentPage ? btnActive : btnInactive}
                            ${page === '...' ? "cursor-default px-3" : "cursor-pointer"}
                        `}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`${btnBase} ${btnArrow} rounded-r-md`}
                >
                    <span className="text-lg font-bold">{">"}</span>
                </button>
            </div>
        </div>
    );
};