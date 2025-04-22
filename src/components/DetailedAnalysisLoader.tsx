
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Database, BarChart, FileText, Lightbulb } from 'lucide-react';

interface DetailedAnalysisLoaderProps {
  progress: number;
}

interface ProcessingStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed';
}

const DetailedAnalysisLoader = ({ progress }: DetailedAnalysisLoaderProps) => {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { 
      id: 'data', 
      label: 'Reading data', 
      icon: <FileText className="h-5 w-5" />, 
      status: 'pending' 
    },
    { 
      id: 'process', 
      label: 'Processing columns', 
      icon: <Database className="h-5 w-5" />, 
      status: 'pending' 
    },
    { 
      id: 'charts', 
      label: 'Generating visualizations', 
      icon: <BarChart className="h-5 w-5" />, 
      status: 'pending' 
    },
    { 
      id: 'insights', 
      label: 'Creating AI insights', 
      icon: <Lightbulb className="h-5 w-5" />, 
      status: 'pending' 
    }
  ]);

  useEffect(() => {
    // Update steps based on progress
    if (progress < 25) {
      setSteps(prev => 
        prev.map(step => 
          step.id === 'data' 
            ? { ...step, status: 'processing' } 
            : step
        )
      );
    } else if (progress < 50) {
      setSteps(prev => 
        prev.map(step => {
          if (step.id === 'data') return { ...step, status: 'completed' };
          if (step.id === 'process') return { ...step, status: 'processing' };
          return step;
        })
      );
    } else if (progress < 75) {
      setSteps(prev => 
        prev.map(step => {
          if (step.id === 'data' || step.id === 'process') return { ...step, status: 'completed' };
          if (step.id === 'charts') return { ...step, status: 'processing' };
          return step;
        })
      );
    } else if (progress < 100) {
      setSteps(prev => 
        prev.map(step => {
          if (step.id === 'data' || step.id === 'process' || step.id === 'charts') 
            return { ...step, status: 'completed' };
          if (step.id === 'insights') return { ...step, status: 'processing' };
          return step;
        })
      );
    } else {
      setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
    }
  }, [progress]);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Analyzing your data</h2>
      <Card>
        <CardContent className="pt-6">
          <Progress value={progress} className="mb-6" />
          
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : step.status === 'processing' 
                        ? 'bg-primary text-white animate-pulse' 
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.status === 'completed' ? <Check className="h-4 w-4" /> : step.icon}
                </div>
                <span className={`text-sm ${
                  step.status === 'completed' 
                    ? 'text-green-500' 
                    : step.status === 'processing' 
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground'
                }`}>
                  {step.label}
                  {step.status === 'processing' && '...'}
                </span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            {progress < 100 
              ? "This may take a moment depending on the data size" 
              : "Analysis complete! Generating dashboard..."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedAnalysisLoader;
