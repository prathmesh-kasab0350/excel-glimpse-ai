
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIInsightsProps {
  insights: string[];
  isLoading?: boolean;
}

const AIInsights = ({ insights = [], isLoading = false }: AIInsightsProps) => {
  // Sample insights if none are provided
  const displayInsights = insights.length ? insights : [
    "Sales are growing consistently at 15% month-over-month",
    "The Electronics category shows the highest profit margin (24%)",
    "Customer retention is stronger in the West region",
    "There's a seasonal pattern in furniture sales peaking in Q2",
    "Product returns are lowest for items in the $50-$100 price range"
  ];

  const handleFeedback = (type: 'positive' | 'negative') => {
    console.log(`User gave ${type} feedback on insights`);
    // This would send feedback to the backend to improve future insights
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">Gemini AI Insights</CardTitle>
          </div>
          {!isLoading && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Helpful?</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={() => handleFeedback('positive')}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={() => handleFeedback('negative')}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 h-5 w-5 mt-0.5"></div>
                <div className="h-4 bg-primary/10 rounded w-full"></div>
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
