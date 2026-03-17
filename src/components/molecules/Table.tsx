import React from 'react';

export interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
    headerClassName?: string;
    rowClassName?: string;
}
export const Table = <T extends Record<string, any>>({
    data,
    columns,
    isLoading = false,
    emptyMessage = 'No hay registros',
    headerClassName = "bg-[#4da6ff]"
}: TableProps<T>) => {

    if (isLoading) return <div className="p-8 text-center text-gray-500">Cargando datos...</div>;
    if (!data.length) return <div className="p-8 text-center text-gray-500">{emptyMessage}</div>;

    return (
        <div className="w-full overflow-hidden border border-slate-200  shadow-sm bg-white">
            <table className="w-full text-center border-collapse">
                <thead className="bg-[#4da6ff] text-white">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="p-3 text-xs font-bold uppercase border-x border-white/20">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                    {data.map((item, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`border-b border-slate-100 transition-colors 
                                 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-300/50'
                                }`}
                        >
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="p-3 border-x border-slate-50">
                                    {col.cell ? col.cell(item) : col.accessorKey ? item[col.accessorKey] : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};