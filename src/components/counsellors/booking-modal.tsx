'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { Counsellor } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  counsellor: Counsellor;
}

export function BookingModal({ isOpen, onOpenChange, counsellor }: BookingModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [shareData, setShareData] = useState(false);
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
        title: "Booking Confirmed!",
        description: `Your session with ${counsellor.name} has been booked.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book a Session with {counsellor.name}</DialogTitle>
          <DialogDescription>
            Choose a date and time for your confidential session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="time">Time</Label>
              <Select>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Optional Note (max 300 chars)</Label>
              <Textarea id="notes" placeholder="Anything you'd like the counsellor to know beforehand?" />
            </div>
            <div className="items-top flex space-x-2 rounded-md border p-4 bg-secondary/50">
                <Checkbox id="shareData" checked={shareData} onCheckedChange={(checked) => setShareData(checked as boolean)} />
                <div className="grid gap-1.5 leading-none">
                    <label
                    htmlFor="shareData"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Share Data with Counsellor
                    </label>
                    <p className="text-xs text-muted-foreground">
                    Allow {counsellor.name} to view your anonymized journal and tracker data to better support you. This is optional.
                    </p>
                </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleBooking}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
