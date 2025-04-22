
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface AIInsightsProps {
  insights: string[];
}

const AIInsights = ({ insights = [] }: AIInsightsProps) => {
  // Sample insights if none are provided
  const displayInsights = insights.length ? insights : [
    "Sales are growing consistently at 15% month-over-month",
    "The Electronics category shows the highest profit margin (24%)",
    "Customer retention is stronger in the West region",
    "There's a seasonal pattern in furniture sales peaking in Q2",
    "Product returns are lowest for items in the $50-$100 price range"
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default AIInsights;
