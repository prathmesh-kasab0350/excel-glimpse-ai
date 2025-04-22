
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast";

interface AIInsightsProps {
  insights: string[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

const AIInsights = ({ 
  insights = [], 
  isLoading = false,
  onRefresh
}: AIInsightsProps) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'positive' | 'negative' | null>(null);
  const { toast } = useToast();
  
  // Sample insights if none are provided
  const displayInsights = insights.length ? insights : [
    "Sales are growing consistently at 15% month-over-month",
    "The Electronics category shows the highest profit margin (24%)",
    "Customer retention is stronger in the West region",
    "There's a seasonal pattern in furniture sales peaking in Q2",
    "Product returns are lowest for items in the $50-$100 price range"
  ];

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedbackGiven(type);
    
    toast({
      title: `Thank you for your ${type} feedback`,
      description: "This helps improve our AI insights."
    });
    
    // In a real app, this would send feedback to the backend
    console.log(`User gave ${type} feedback on insights`);
  };
  
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      // Simulation for demo purposes
      toast({
        title: "Regenerating insights",
        description: "New insights are being generated..."
      });
      
      // Simulate refresh delay
      setTimeout(() => {
        toast({
          title: "Insights updated",
          description: "New insights have been generated."
        });
      }, 1500);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">Gemini AI Insights</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {!isLoading && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={handleRefresh}
                  title="Regenerate insights"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>Helpful?</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-7 w-7 p-0 ${feedbackGiven === 'positive' ? 'bg-primary/10 text-primary' : ''}`}
                    onClick={() => handleFeedback('positive')}
                    disabled={feedbackGiven !== null}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-7 w-7 p-0 ${feedbackGiven === 'negative' ? 'bg-primary/10 text-primary' : ''}`}
                    onClick={() => handleFeedback('negative')}
                    disabled={feedbackGiven !== null}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {displayInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full h-5 w-5 text-xs mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;
