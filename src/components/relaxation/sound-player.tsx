'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, X, Timer } from 'lucide-react';
import type { RelaxationSound } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface SoundPlayerProps {
  sound: RelaxationSound;
  onClose: () => void;
}

export function SoundPlayer({ sound, onClose }: SoundPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = sound.audioUrl;
      audioRef.current.loop = true;
      audioRef.current.play().catch(e => console.error("Autoplay was prevented:", e));
      setIsPlaying(true);
    }
    
    return () => {
      if(timerId) clearTimeout(timerId);
    }
  }, [sound, timerId]);

  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimerSet = () => {
    if (timer && timer > 0) {
        if(timerId) clearTimeout(timerId);
        const newTimerId = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            onClose();
        }, timer * 60 * 1000);
        setTimerId(newTimerId);
    }
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 shadow-2xl z-50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{sound.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <div className="flex-1 flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-muted-foreground"/>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                    <Timer className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Set Timer</h4>
                        <p className="text-sm text-muted-foreground">
                        Stop playback after a set time.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="minutes">Minutes</Label>
                        <Input
                            id="minutes"
                            type="number"
                            defaultValue={timer ?? 15}
                            onChange={(e) => setTimer(parseInt(e.target.value))}
                            className="col-span-2 h-8"
                        />
                        </div>
                    </div>
                    <Button onClick={handleTimerSet}>Set</Button>
                </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <audio ref={audioRef} />
    </Card>
  );
}
