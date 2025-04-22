
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataSummary from './DataSummary';
import ChartCard from './ChartCard';

interface DashboardProps {
  data: {
    summary: {
      totalRows: number;
      totalColumns: number;
      dataTypes: { [key: string]: number };
    };
    charts: {
      id: string;
      title: string;
      description?: string;
      type: 'bar' | 'pie' | 'line' | 'area';
      data: any[];
      config: any;
    }[];
  };
}

const Dashboard = ({ data }: DashboardProps) => {
  // Mock data for the initial render
  const mockData = {
    summary: {
      totalRows: 1250,
      totalColumns: 8,
      dataTypes: {
        numeric: 3,
        text: 4,
        date: 1,
      },
    },
    charts: [
      {
        id: 'chart1',
        title: 'Revenue by Category',
        description: 'Monthly breakdown by product category',
        type: 'bar' as const,
        data: [],
        config: {},
      },
      {
        id: 'chart2',
        title: 'Customer Distribution',
        type: 'pie' as const,
        data: [],
        config: {},
      },
      {
        id: 'chart3',
        title: 'Growth Trend',
        description: 'Year-over-year comparison',
        type: 'line' as const,
        data: [],
        config: {},
      },
      {
        id: 'chart4',
        title: 'Regional Performance',
        type: 'area' as const,
        data: [],
        config: {},
      },
    ],
  };

  // Use real data if available, otherwise use mock data
  const dashboardData = data || mockData;

  return (
    <div className="w-full animate-fade-in">
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="min-h-[400px]">
          <div className="dashboard-grid">
            {dashboardData.charts.map((chart) => (
              <ChartCard 
                key={chart.id}
                title={chart.title}
                description={chart.description}
                type={chart.type}
                data={chart.data}
                config={chart.config}
                className="shadow-sm hover:shadow-md transition-shadow duration-200"
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="summary" className="min-h-[400px]">
          <div className="grid gap-6 md:grid-cols-2">
            <DataSummary 
              totalRows={dashboardData.summary.totalRows}
              totalColumns={dashboardData.summary.totalColumns}
              dataTypes={dashboardData.summary.dataTypes}
            />
            
            {/* Additional summary components can be added here */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Data Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Completeness</span>
                      <span>98%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="bg-chart-green h-1.5 rounded-full" style={{ width: '98%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Accuracy</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="bg-chart-blue h-1.5 rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Consistency</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="bg-chart-purple h-1.5 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
