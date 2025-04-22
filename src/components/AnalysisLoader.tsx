
import React from 'react';
import { ChartBar, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisLoaderProps {
  progress?: number;
  status?: string;
}

const AnalysisLoader = ({ 
  progress = 0, 
  status = 'Analyzing your data...' 
}: AnalysisLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-8 animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="h-8 w-8 text-primary animate-spin-slow" />
        </div>
        <div className={cn(
          "h-20 w-20 rounded-full flex items-center justify-center",
          "bg-gradient-to-r from-primary/20 to-primary/10"
        )}>
          <ChartBar className="h-10 w-10 text-primary" />
        </div>
      </div>

      <h3 className="text-lg font-medium mb-2">{status}</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Our AI is identifying patterns and preparing visualizations
      </p>

      {progress > 0 && (
        <div className="w-full max-w-xs bg-secondary rounded-full h-2.5 mb-3">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default AnalysisLoader;
