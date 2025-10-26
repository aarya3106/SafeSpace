'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BreathingGuideProps {
  exercise: {
    id: string;
    name: string;
    description: string;
    steps: string[];
  };
}

export function BreathingGuide({ exercise }: BreathingGuideProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const totalDuration = exercise.steps.reduce((acc, step) => {
    const match = step.match(/\((\d+)s\)/);
    return acc + (match ? parseInt(match[1], 10) : 4);
  }, 0);

  useEffect(() => {
    const stepDurations = exercise.steps.map(step => {
        const match = step.match(/\((\d+)s\)/);
        return match ? parseInt(match[1], 10) * 1000 : 4000;
    });

    const interval = setTimeout(() => {
      setStepIndex((prevIndex) => (prevIndex + 1) % exercise.steps.length);
    }, stepDurations[stepIndex]);

    return () => clearTimeout(interval);
  }, [stepIndex, exercise.steps]);

  const animationDuration = totalDuration + 's';
  const currentStep = exercise.steps[stepIndex];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 gap-6">
        <div className="relative flex items-center justify-center w-48 h-48">
          <div 
            className="absolute bg-primary/20 rounded-full"
            style={{ animation: `breathing ${totalDuration}s infinite ease-in-out`}}
          ></div>
          <div 
            className="absolute bg-primary/40 rounded-full"
            style={{ animation: `breathing ${totalDuration}s infinite ease-in-out`, animationDelay: `-${totalDuration / 4}s` }}
          ></div>
           <div 
            className="absolute bg-primary/30 rounded-full"
            style={{ animation: `breathing ${totalDuration}s infinite ease-in-out`, animationDelay: `-${totalDuration / 2}s`}}
          ></div>
          <div className="z-10 text-xl font-bold text-primary-foreground bg-primary p-4 rounded-full shadow-lg">
            {currentStep}
          </div>
        </div>
        <div className="flex gap-2">
            {exercise.steps.map((step, index) => (
                <div key={index} className={`h-2 w-8 rounded-full ${index === stepIndex ? 'bg-primary' : 'bg-muted'}`}/>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
