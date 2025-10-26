"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Label } from '../ui/label';

interface ConsentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConsent: () => void;
}

export function ConsentModal({ isOpen, onOpenChange, onConsent }: ConsentModalProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Privacy Matters</DialogTitle>
          <DialogDescription>
            Welcome to SafeSpace. Before you continue, please read and agree to our data practices.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm text-muted-foreground">
          <p>
            <strong>We are an anonymous platform.</strong> We will never ask for your real name, email, or phone number.
          </p>
          <p>
            The data you create (journal entries, tracker data, chat history) is stored securely and tied only to an anonymous ID on your device.
          </p>
          <p>
            You can choose to share your tracker and journal data with a counsellor when you book an appointment. This is optional.
          </p>
          <p>
            You can export or delete all of your data at any time from your profile.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
          <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I understand and agree to these terms.
          </Label>
        </div>
        <DialogFooter>
          <Button onClick={onConsent} disabled={!agreed}>
            Continue to SafeSpace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
