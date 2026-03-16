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
}

export const Table = <T extends Record<string, any>>({ data, columns, isLoading = false, emptyMessage = 'No hay registros' }: TableProps<T>) => {

    if (isLoading) return <div className="p-8 text-center text-gray-500">Cargando datos...</div>;
    if (!data.length) return <div className="p-8 text-center text-gray-500">{emptyMessage}</div>;

    return (
        <div className="w-full overflow-x-auto border border-gray-200 rounded-sm">
            <table className="w-full text-center border-collapse">
                <thead className="bg-[#4da6ff] text-white">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="p-3 text-sm font-semibold border border-white/20">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className={`border-b ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50`}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="p-3 border-x border-gray-200">
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