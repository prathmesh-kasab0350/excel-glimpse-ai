
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataSummaryProps {
  totalRows: number;
  totalColumns: number;
  dataTypes: { [key: string]: number };
}

const DataSummary = ({ totalRows, totalColumns, dataTypes }: DataSummaryProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Data Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2">
          <div className="stat-card">
            <span className="text-sm text-muted-foreground">Rows</span>
            <span className="text-2xl font-bold">{totalRows.toLocaleString()}</span>
          </div>
          <div className="stat-card">
            <span className="text-sm text-muted-foreground">Columns</span>
            <span className="text-2xl font-bold">{totalColumns}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Data Types</h4>
          <div className="space-y-2">
            {Object.entries(dataTypes).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center text-sm">
                <span className="capitalize">{type}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSummary;
