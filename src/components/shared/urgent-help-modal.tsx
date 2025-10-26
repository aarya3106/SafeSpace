"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UrgentHelpModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function UrgentHelpModal({ isOpen, onOpenChange }: UrgentHelpModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are not alone. Help is available.</AlertDialogTitle>
          <AlertDialogDescription>
            If you are in immediate danger or crisis, please reach out to one of these resources right away. Your safety is the most important thing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-2">
                <h3 className="font-semibold">National Crisis and Suicide Lifeline</h3>
                <p className="text-sm text-muted-foreground">Call or text 988 anytime in the US and Canada. In the UK, you can call 111.</p>
                <Button asChild><a href="tel:988">Call 988</a></Button>
            </div>
             <div className="flex flex-col space-y-2">
                <h3 className="font-semibold">Crisis Text Line</h3>
                <p className="text-sm text-muted-foreground">Text "HOME" to 741741 to connect with a crisis counselor.</p>
                <Button asChild><a href="sms:741741">Text HOME to 741741</a></Button>
            </div>
             <div className="flex flex-col space-y-2">
                <h3 className="font-semibold">Talk to a Counsellor</h3>
                <p className="text-sm text-muted-foreground">Book a session with one of our counsellors. They are here to help.</p>
                <Button asChild variant="secondary"><Link href="/counsellors">Book a Session</Link></Button>
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
