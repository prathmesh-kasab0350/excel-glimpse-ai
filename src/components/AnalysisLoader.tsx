
import React from 'react';
import { ChartBar, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface AnalysisLoaderProps {
  progress?: number;
  status?: string;
}

const AnalysisLoader = ({ 
  progress = 0, 
  status = 'Analyzing your data...' 
}: AnalysisLoaderProps) => {
  // Define the steps of the analysis process with more details
  const stages = [
    { threshold: 5, message: 'Reading file content...' },
    { threshold: 15, message: 'Parsing data structure...' },
    { threshold: 25, message: 'Identifying column types...' },
    { threshold: 35, message: 'Processing JSON columns...' },
    { threshold: 45, message: 'Generating statistical summary...' },
    { threshold: 55, message: 'Determining optimal visualizations...' },
    { threshold: 65, message: 'Creating charts and graphs...' },
    { threshold: 75, message: 'Sending data to Gemini AI...' },
    { threshold: 85, message: 'Processing AI insights...' },
    { threshold: 95, message: 'Assembling dashboard...' },
    { threshold: 100, message: 'Ready!' }
  ];
  
  // Get the current stage based on progress
  const currentStage = stages.reduce((prev, curr) => {
    return progress >= curr.threshold ? curr : prev;
  }, stages[0]);
  
  // Display the appropriate message based on progress or use provided status
  const displayStatus = status === 'Analyzing your data...' ? currentStage.message : status;

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

      <h3 className="text-lg font-medium mb-2">{displayStatus}</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Our AI is analyzing your data and creating optimal visualizations
      </p>

      {progress > 0 && (
        <div className="w-full max-w-xs">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right mt-1">
            {Math.round(progress)}% complete
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalysisLoader;
