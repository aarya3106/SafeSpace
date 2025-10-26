'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { relaxationSounds, breathingExercises } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle, PauseCircle } from 'lucide-react';
import { BreathingGuide } from '@/components/relaxation/breathing-guide';
import { SoundPlayer } from '@/components/relaxation/sound-player';
import type { RelaxationSound } from '@/lib/types';

export default function RelaxationPage() {
  const [activeSound, setActiveSound] = useState<RelaxationSound | null>(null);

  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

  const toggleSound = (sound: RelaxationSound) => {
    if (activeSound?.id === sound.id) {
      setActiveSound(null);
    } else {
      setActiveSound(sound);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Relaxation & Sounds</h1>
        <p className="text-muted-foreground">Find your calm with sounds and breathing exercises.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ambient & Relaxation Sounds</CardTitle>
          <CardDescription>Select a sound to play. Set a timer and let the stress melt away.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relaxationSounds.map(sound => {
            const img = getImage(sound.imageId);
            const isPlaying = activeSound?.id === sound.id;
            return (
              <Card key={sound.id} className="overflow-hidden group">
                {img && (
                  <div className="relative">
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      width={600}
                      height={400}
                      data-ai-hint={img.imageHint}
                      className="aspect-video object-cover w-full"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-14 w-14 rounded-full bg-background/80 hover:bg-background"
                          onClick={() => toggleSound(sound)}
                        >
                          {isPlaying ? <PauseCircle className="h-8 w-8 text-primary"/> : <PlayCircle className="h-8 w-8 text-primary"/>}
                        </Button>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{sound.name}</CardTitle>
                  <CardDescription>{sound.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </CardContent>
      </Card>

      {activeSound && <SoundPlayer sound={activeSound} onClose={() => setActiveSound(null)} />}

      <Card>
        <CardHeader>
          <CardTitle>Guided Breathing</CardTitle>
          <CardDescription>Follow these simple exercises to calm your nervous system.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {breathingExercises.map(exercise => (
                <BreathingGuide key={exercise.id} exercise={exercise} />
            ))}
        </CardContent>
      </Card>

    </div>
  );
}
