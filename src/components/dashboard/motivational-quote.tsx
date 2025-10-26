'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motivationalQuotes } from '@/lib/data';

export function MotivationalQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // This ensures the random selection only happens on the client, avoiding hydration mismatches.
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  if (!quote) {
    // You can return a loading state or a default quote
    return (
       <Card className="bg-accent/50 border-accent">
        <CardContent className="p-6">
          <blockquote className="text-lg font-medium text-accent-foreground/80 italic">
            Loading your daily inspiration...
          </blockquote>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-accent/50 border-accent">
      <CardContent className="p-6">
        <blockquote className="text-lg font-medium text-accent-foreground/80 italic">
          "{quote}"
        </blockquote>
      </CardContent>
    </Card>
  );
}
