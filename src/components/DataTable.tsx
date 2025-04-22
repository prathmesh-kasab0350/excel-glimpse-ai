
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataTableProps {
  data: {
    headers: string[];
    rows: any[][];
  };
  maxRows?: number;
}

const DataTable = ({ data, maxRows = 5 }: DataTableProps) => {
  // Use sample data if no data is provided
  const tableData = data.headers.length ? data : {
    headers: ['ID', 'Product', 'Category', 'Price', 'Date', 'Stock'],
    rows: [
      [1, 'Laptop', 'Electronics', '$1299.99', '2025-01-15', 45],
      [2, 'Desk Chair', 'Furniture', '$249.99', '2025-01-16', 23],
      [3, 'Coffee Maker', 'Appliances', '$89.99', '2025-01-17', 15],
      [4, 'Headphones', 'Electronics', '$149.99', '2025-01-18', 34],
      [5, 'Desk Lamp', 'Furniture', '$39.99', '2025-01-19', 50],
    ]
  };

  const displayRows = tableData.rows.slice(0, maxRows);

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Data Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableData.headers.map((header, index) => (
                  <TableHead key={index} className="font-medium">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {tableData.rows.length > maxRows && (
          <div className="text-center py-2 text-xs text-muted-foreground bg-muted/30 border-t">
            Showing {maxRows} of {tableData.rows.length} rows
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
