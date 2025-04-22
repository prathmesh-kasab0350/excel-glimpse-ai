
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, PieChart, LineChart, AreaChart, ScatterChart,
  Bar, Pie, Line, Area, Scatter, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';

interface ChartCardProps {
  title: string;
  description?: string;
  type: 'bar' | 'pie' | 'line' | 'area' | 'scatter' | 'histogram' | 'box';
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
  // Generate sample data if none is provided
  const chartData = data.length ? data : generateSampleData(type);
  
  // Default colors for the charts
  const COLORS = ['#2563eb', '#0d9488', '#9333ea', '#f97316', '#dc2626', '#16a34a'];
  
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                paddingAngle={2}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}`, 'Value']}
                contentStyle={{ fontSize: 12, borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#9333ea" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0d9488" 
                fill="#0d9488" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="x" name="x" tick={{ fontSize: 10 }} />
              <YAxis dataKey="y" name="y" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Scatter name="Values" data={chartData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      case 'histogram':
        // For simplicity, we'll render histogram as a bar chart
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'box':
        // For simplicity, we'll render a special bar chart as a box plot representation
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="value" fill="#16a34a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      default:
        return <div>Chart type not supported</div>;
    }
  };

  // Function to generate sample data for each chart type
  function generateSampleData(chartType: string) {
    switch (chartType) {
      case 'bar':
        return [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 500 }
        ];
      case 'pie':
        return [
          { name: 'Group A', value: 400 },
          { name: 'Group B', value: 300 },
          { name: 'Group C', value: 300 },
          { name: 'Group D', value: 200 }
        ];
      case 'line':
        return [
          { name: 'Q1', value: 240 },
          { name: 'Q2', value: 390 },
          { name: 'Q3', value: 320 },
          { name: 'Q4', value: 500 },
          { name: 'Q1', value: 380 },
          { name: 'Q2', value: 430 }
        ];
      case 'area':
        return [
          { name: 'East', value: 240 },
          { name: 'West', value: 300 },
          { name: 'North', value: 180 },
          { name: 'South', value: 320 },
          { name: 'Central', value: 280 }
        ];
      case 'scatter':
        return [
          { x: 100, y: 200, z: 200 },
          { x: 120, y: 100, z: 260 },
          { x: 170, y: 300, z: 400 },
          { x: 140, y: 250, z: 280 },
          { x: 150, y: 400, z: 500 },
          { x: 110, y: 280, z: 200 }
        ];
      case 'histogram':
        return [
          { name: '0-10', value: 8 },
          { name: '10-20', value: 15 },
          { name: '20-30', value: 22 },
          { name: '30-40', value: 18 },
          { name: '40-50', value: 12 },
          { name: '50-60', value: 5 }
        ];
      case 'box':
        return [
          { name: 'Category A', min: 20, q1: 40, median: 50, q3: 70, max: 90, value: 50 },
          { name: 'Category B', min: 30, q1: 45, median: 60, q3: 80, max: 100, value: 60 },
          { name: 'Category C', min: 10, q1: 30, median: 40, q3: 60, max: 80, value: 40 }
        ];
      default:
        return [];
    }
  }

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
