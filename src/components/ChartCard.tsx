
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart, AreaChart } from 'recharts';

interface ChartCardProps {
  title: string;
  description?: string;
  type: 'bar' | 'pie' | 'line' | 'area';
  data: any[];
  config: {
    xKey?: string;
    yKey?: string;
    dataKey?: string;
    nameKey?: string;
    valueKey?: string;
    colors?: string[];
  };
  className?: string;
}

const ChartCard = ({ 
  title, 
  description, 
  type, 
  data, 
  config, 
  className 
}: ChartCardProps) => {
  const renderChart = () => {
    const width = 350;
    const height = 200;
    
    const chartProps = {
      width,
      height,
      data,
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
    };

    switch (type) {
      case 'bar':
        return (
          <BarChart {...chartProps}>
            {/* Bar chart implementation */}
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart {...chartProps}>
            {/* Pie chart implementation */}
          </PieChart>
        );
      case 'line':
        return (
          <LineChart {...chartProps}>
            {/* Line chart implementation */}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...chartProps}>
            {/* Area chart implementation */}
          </AreaChart>
        );
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
