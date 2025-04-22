
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Edit, Save, Download, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import DataSummary from './DataSummary';
import ChartCard from './ChartCard';
import { useToast } from "@/hooks/use-toast";

interface ChartData {
  id: string;
  title: string;
  description?: string;
  type: 'bar' | 'pie' | 'line' | 'area' | 'scatter' | 'histogram' | 'box';
  data: any[];
  config: any;
}

interface DashboardProps {
  data: {
    summary: {
      totalRows: number;
      totalColumns: number;
      dataTypes: { [key: string]: number };
    };
    charts: ChartData[];
    tableData?: {
      headers: string[];
      rows: any[][];
    };
    insights?: string[];
  };
}

const chartTypes = [
  { label: 'Bar Chart', value: 'bar' },
  { label: 'Pie Chart', value: 'pie' },
  { label: 'Line Chart', value: 'line' },
  { label: 'Area Chart', value: 'area' },
  { label: 'Scatter Plot', value: 'scatter' },
  { label: 'Histogram', value: 'histogram' },
  { label: 'Box Plot', value: 'box' }
];

const Dashboard = ({ data }: DashboardProps) => {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to track edited charts
  const [editedCharts, setEditedCharts] = useState<ChartData[]>([]);
  // State for layout configuration
  const [layout, setLayout] = useState<'grid' | 'single'>('grid');
  const { toast } = useToast();

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
  
  // Initialize editedCharts if empty
  React.useEffect(() => {
    if (editedCharts.length === 0) {
      setEditedCharts([...dashboardData.charts]);
    }
  }, [dashboardData.charts]);

  const handleChartTypeChange = (chartId: string, newType: ChartData['type']) => {
    setEditedCharts(prev => 
      prev.map(chart => 
        chart.id === chartId ? { ...chart, type: newType } : chart
      )
    );
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes when exiting edit mode
      // In a real app, this would send the updated charts to the backend
      console.log('Saving changes to charts:', editedCharts);
      
      toast({
        title: "Dashboard updated",
        description: "Your changes have been saved.",
      });
    }
    setIsEditing(!isEditing);
  };

  const saveDashboardConfiguration = () => {
    // In a real app, this would save the dashboard configuration to localStorage or a backend
    const dashboardConfig = {
      charts: editedCharts,
      layout,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage for demo purposes
    localStorage.setItem('savedDashboard', JSON.stringify(dashboardConfig));
    
    toast({
      title: "Dashboard saved",
      description: "Your dashboard configuration has been saved and can be loaded later.",
    });
  };

  const exportDashboardAsPDF = () => {
    // This would be implemented with a library like jsPDF or html2pdf
    toast({
      title: "Export started",
      description: "Your dashboard PDF is being generated...",
    });
    
    // Simulate PDF generation delay
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your dashboard has been exported as PDF.",
      });
    }, 1500);
  };

  const toggleLayout = () => {
    setLayout(prev => prev === 'grid' ? 'single' : 'grid');
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleLayout}
            title={`Switch to ${layout === 'grid' ? 'single' : 'grid'} view`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportDashboardAsPDF}
            title="Export as PDF"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={saveDashboardConfiguration}
            title="Save dashboard configuration"
          >
            <Save className="h-4 w-4" />
          </Button>
          
          <Button 
            variant={isEditing ? "default" : "outline"} 
            size="sm" 
            onClick={toggleEditMode}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Dashboard
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="min-h-[400px]">
          <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {(isEditing ? editedCharts : dashboardData.charts).map((chart) => (
              <div key={chart.id} className="relative">
                {isEditing && (
                  <div className="absolute top-2 right-2 z-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                          <span>Chart Type</span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {chartTypes.map((type) => (
                          <DropdownMenuItem 
                            key={type.value}
                            onClick={() => handleChartTypeChange(chart.id, type.value as ChartData['type'])}
                            className={chart.type === type.value ? "bg-primary/10" : ""}
                          >
                            {type.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                <ChartCard 
                  key={chart.id}
                  title={chart.title}
                  description={chart.description}
                  type={chart.type}
                  data={chart.data}
                  config={chart.config}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200"
                />
              </div>
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
            
            {/* Additional summary components */}
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
