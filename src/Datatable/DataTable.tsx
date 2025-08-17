import { useState } from "react";


export interface Column<T> {
  key: keyof T;
  header: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    if (a[sortKey]! < b[sortKey]!) return sortAsc ? -1 : 1;
    if (a[sortKey]! > b[sortKey]!) return sortAsc ? 1 : -1;
    return 0;
  });

  const toggleRow = (row: T) => {
    let updated: T[];
    if (selected.includes(row)) {
      updated = selected.filter((r) => r !== row);
    } else {
      updated = selectable ? [...selected, row] : [row];
    }
    setSelected(updated);
    onRowSelect?.(updated);
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (!loading && data.length === 0) {
    return <div className="p-4 text-gray-500">No data available</div>;
  }

  return (
    <table className="min-w-full border border-gray-200 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="px-4 py-2"></th>}
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort(col.key)}
            >
              {col.header}{" "}
              {sortKey === col.key ? (sortAsc ? "▲" : "▼") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr
            key={row.id}
            className={`border-t hover:bg-gray-50 ${
              selected.includes(row) ? "bg-blue-100" : ""
            }`}
            onClick={() => selectable && toggleRow(row)}
          >
            {selectable && (
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selected.includes(row)}
                  readOnly
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={String(col.key)} className="px-4 py-2">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
