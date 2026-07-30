import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <table className={`w-full text-left text-sm text-slate-700 ${className}`}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
    {children}
  </thead>
);

export const TableRow: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({
  children,
  className = '',
  onClick
}) => (
  <tr
    onClick={onClick}
    className={`border-b border-slate-100 transition-colors last:border-0 ${
      onClick ? 'hover:bg-slate-50/80 cursor-pointer' : ''
    } ${className}`}
  >
    {children}
  </tr>
);

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => <td className={`px-5 py-4 align-middle ${className}`}>{children}</td>;

export const TableHeadCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => <th className={`px-5 py-3 font-semibold ${className}`}>{children}</th>;
