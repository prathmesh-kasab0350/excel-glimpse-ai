
import React, { useState } from 'react';
import { Database, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface DatabaseConnectorProps {
  onConnected: (connectionData: {
    host: string;
    username: string;
    password: string;
    port: string;
    database: string;
    table: string;
  }) => void;
}

const DatabaseConnector = ({ onConnected }: DatabaseConnectorProps) => {
  const [connection, setConnection] = useState({
    host: '',
    username: '',
    password: '',
    port: '3306',
    database: '',
    table: ''
  });
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const [databases, setDatabases] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!connection.host || !connection.username) {
      toast({
        title: "Missing information",
        description: "Please fill in the required fields.",
        variant: "destructive"
      });
      return;
    }

    setStatus('connecting');
    
    // Simulate connection to MySQL server
    setTimeout(() => {
      // For demo purposes, randomly decide if connection succeeds or fails
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        setStatus('connected');
        setDatabases(['sales_db', 'inventory_db', 'customers_db', 'analytics_db']);
        
        toast({
          title: "Connected to database",
          description: `Successfully connected to ${connection.host}`,
        });
      } else {
        setStatus('failed');
        
        toast({
          title: "Connection failed",
          description: "Could not connect to the database. Please check your credentials.",
          variant: "destructive"
        });
      }
    }, 1500);
  };
  
  const handleDatabaseSelect = (database: string) => {
    setConnection(prev => ({ ...prev, database }));
    
    // Simulate loading tables
    setTimeout(() => {
      setTables(['sales', 'products', 'customers', 'regions', 'transactions']);
      
      toast({
        title: "Database selected",
        description: `Tables loaded from ${database}`,
      });
    }, 800);
  };
  
  const handleTableSelect = (table: string) => {
    const updatedConnection = { ...connection, table };
    setConnection(updatedConnection);
    
    toast({
      title: "Table selected",
      description: `${table} is ready for analysis`,
    });
    
    // Notify parent component
    onConnected(updatedConnection);
  };
  
  const handleRetry = () => {
    setStatus('idle');
  };

  return (
    <div className="bg-muted/40 rounded-lg p-6 border">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        Connect to MySQL Database
      </h3>
      
      {status === 'connected' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Check className="h-4 w-4" />
            <span>Connected to {connection.host}</span>
          </div>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="database">Select Database</Label>
              <select 
                id="database"
                className="w-full p-2 mt-1 border rounded-md bg-background"
                value={connection.database}
                onChange={(e) => handleDatabaseSelect(e.target.value)}
              >
                <option value="">-- Select a database --</option>
                {databases.map(db => (
                  <option key={db} value={db}>{db}</option>
                ))}
              </select>
            </div>
            
            {connection.database && (
              <div>
                <Label htmlFor="table">Select Table</Label>
                <select 
                  id="table"
                  className="w-full p-2 mt-1 border rounded-md bg-background"
                  value={connection.table}
                  onChange={(e) => handleTableSelect(e.target.value)}
                >
                  <option value="">-- Select a table --</option>
                  {tables.map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      ) : status === 'failed' ? (
        <div>
          <div className="flex items-center gap-2 text-destructive text-sm mb-4">
            <X className="h-4 w-4" />
            <span>Connection failed. Please check your credentials and try again.</span>
          </div>
          <Button onClick={handleRetry}>Retry Connection</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host">
              Host <span className="text-destructive">*</span>
            </Label>
            <Input 
              id="host" 
              placeholder="localhost or IP address" 
              value={connection.host}
              onChange={(e) => setConnection(prev => ({ ...prev, host: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input 
              id="port" 
              placeholder="3306" 
              value={connection.port}
              onChange={(e) => setConnection(prev => ({ ...prev, port: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">
              Username <span className="text-destructive">*</span>
            </Label>
            <Input 
              id="username" 
              placeholder="Database username" 
              value={connection.username}
              onChange={(e) => setConnection(prev => ({ ...prev, username: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Database password" 
              value={connection.password}
              onChange={(e) => setConnection(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <div className="col-span-2">
            <Button 
              className="w-full mt-2" 
              onClick={handleConnect}
              disabled={status === 'connecting'}
            >
              {status === 'connecting' ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseConnector;
