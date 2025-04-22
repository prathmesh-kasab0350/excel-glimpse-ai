
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBar, FileSpreadsheet, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUploader from '@/components/FileUploader';
import AnalysisLoader from '@/components/AnalysisLoader';
import DetailedAnalysisLoader from '@/components/DetailedAnalysisLoader';
import Dashboard from '@/components/Dashboard';
import DataTable from '@/components/DataTable';
import EditableDataTable from '@/components/EditableDataTable';
import AIInsights from '@/components/AIInsights';
import DatabaseConnector from '@/components/DatabaseConnector';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [dbConnection, setDbConnection] = useState({
    host: '',
    username: '',
    password: '',
    port: '3306',
    database: '',
    table: ''
  });
  const [databases, setDatabases] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const [useDetailedLoader, setUseDetailedLoader] = useState(true);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setDashboardData(null); // Reset dashboard when new file is selected
    
    toast({
      title: "File selected",
      description: `${file.name} is ready for analysis.`,
    });
  };

  const handleDatabaseConnect = (connectionData: typeof dbConnection) => {
    setDbConnection(connectionData);
    setConnectionStatus('connected');
    setDashboardData(null); // Reset dashboard when connecting to a new database
    
    toast({
      title: "Database connected",
      description: `Connected to ${connectionData.database}.${connectionData.table}`,
    });
  };

  const handleGenerateDashboard = () => {
    if (!selectedFile && connectionStatus !== 'connected') return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing steps
    const intervalId = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            setIsProcessing(false);
            generateMockDashboard();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 600);
  };

  const generateMockDashboard = () => {
    // This would be replaced with actual data from your backend
    const mockData = {
      summary: {
        totalRows: Math.floor(Math.random() * 5000) + 1000,
        totalColumns: Math.floor(Math.random() * 12) + 4,
        dataTypes: {
          numeric: Math.floor(Math.random() * 5) + 2,
          text: Math.floor(Math.random() * 4) + 2,
          date: Math.floor(Math.random() * 2) + 1,
          boolean: Math.floor(Math.random() * 2),
        },
      },
      charts: [
        {
          id: 'chart1',
          title: 'Sales Distribution',
          description: 'Breakdown by product category',
          type: 'bar' as const,
          data: [],
          config: {},
        },
        {
          id: 'chart2',
          title: 'Regional Analysis',
          type: 'pie' as const,
          data: [],
          config: {},
        },
        {
          id: 'chart3',
          title: 'Monthly Trend',
          description: 'Year-over-year growth pattern',
          type: 'line' as const,
          data: [],
          config: {},
        },
        {
          id: 'chart4',
          title: 'Customer Segments',
          type: 'bar' as const,
          data: [],
          config: {},
        },
      ],
      tableData: {
        headers: ['ID', 'Product', 'Category', 'Price', 'Date', 'Stock'],
        rows: [
          [1, 'Laptop', 'Electronics', '$1299.99', '2025-01-15', 45],
          [2, 'Desk Chair', 'Furniture', '$249.99', '2025-01-16', 23],
          [3, 'Coffee Maker', 'Appliances', '$89.99', '2025-01-17', 15],
          [4, 'Headphones', 'Electronics', '$149.99', '2025-01-18', 34],
          [5, 'Desk Lamp', 'Furniture', '$39.99', '2025-01-19', 50],
        ]
      },
      insights: [
        "Sales are growing consistently at 15% month-over-month",
        "The Electronics category shows the highest profit margin (24%)",
        "Customer retention is stronger in the West region",
        "There's a seasonal pattern in furniture sales peaking in Q2",
        "Product returns are lowest for items in the $50-$100 price range"
      ]
    };
    
    setDashboardData(mockData);
    
    toast({
      title: "Analysis complete",
      description: "Your dashboard is ready to view.",
    });
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setDashboardData(null);
    setIsProcessing(false);
    setProcessingProgress(0);
    setConnectionStatus('idle');
    setDbConnection({
      host: '',
      username: '',
      password: '',
      port: '3306',
      database: '',
      table: ''
    });
    setDatabases([]);
    setTables([]);
  };

  const toggleLoader = () => {
    setUseDetailedLoader(!useDetailedLoader);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container py-4 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChartBar className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Excel Glimpse AI</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container px-4 md:px-6 py-8 max-w-6xl">
        {!selectedFile && connectionStatus !== 'connected' && !dashboardData ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              Transform Your Data into Insights
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              Upload your Excel or CSV file, or connect to a MySQL database and let our AI generate beautiful, insightful visualizations in seconds.
            </p>
            
            <Tabs defaultValue="file" className="max-w-2xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="file">File Upload</TabsTrigger>
                <TabsTrigger value="database">Database Connection</TabsTrigger>
              </TabsList>
              
              <TabsContent value="file" className="mt-0">
                <FileUploader onFileSelect={handleFileSelect} />
              </TabsContent>
              
              <TabsContent value="database" className="mt-0">
                <DatabaseConnector onConnected={handleDatabaseConnect} />
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : isProcessing ? (
          <div className="py-12">
            {useDetailedLoader ? (
              <DetailedAnalysisLoader progress={processingProgress} />
            ) : (
              <AnalysisLoader progress={processingProgress} />
            )}
            <div className="mt-4 text-center">
              <button 
                onClick={toggleLoader} 
                className="text-xs text-muted-foreground underline"
              >
                Switch to {useDetailedLoader ? "simple" : "detailed"} loader
              </button>
            </div>
          </div>
        ) : (selectedFile || connectionStatus === 'connected') && !dashboardData ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {selectedFile ? (
                `Ready to analyze ${selectedFile.name}`
              ) : (
                `Ready to analyze ${dbConnection.database}.${dbConnection.table}`
              )}
            </h2>
            {selectedFile && (
              <p className="text-muted-foreground mb-8">
                File size: {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            )}
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={resetAnalysis}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateDashboard}
                className="px-6"
              >
                Generate Dashboard
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                {selectedFile ? (
                  <>
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      {selectedFile?.name}
                    </h2>
                  </>
                ) : (
                  <>
                    <Database className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      {dbConnection.database}.{dbConnection.table}
                    </h2>
                  </>
                )}
              </div>
              <Button 
                variant="outline" 
                onClick={resetAnalysis}
              >
                Analyze Another Source
              </Button>
            </div>
            
            <div className="grid gap-8 mb-8">
              <div className="grid gap-6 md:grid-cols-2">
                <EditableDataTable 
                  data={dashboardData.tableData}
                  onDataChange={(newData) => {
                    setDashboardData({
                      ...dashboardData,
                      tableData: newData
                    });
                  }}
                />
                <AIInsights 
                  insights={dashboardData.insights}
                  onRefresh={() => {
                    toast({
                      title: "Regenerating insights",
                      description: "Updating insights with the latest data...",
                    });
                    // This would call the backend in a real app
                    setTimeout(() => {
                      toast({
                        title: "Insights updated",
                        description: "New AI insights have been generated.",
                      });
                    }, 1500);
                  }}
                />
              </div>
              <Dashboard data={dashboardData} />
            </div>
          </motion.div>
        )}
      </main>
      
      <footer className="border-t py-4 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Excel Glimpse AI - Data visualization made simple</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
