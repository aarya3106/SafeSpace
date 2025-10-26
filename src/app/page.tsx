"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Heart, Users, BrainCircuit } from 'lucide-react';
import { ConsentModal } from '@/components/auth/consent-modal';
import Image from 'next/image';

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Totally Anonymous',
    description: 'No email, no phone number, no real names. Your space is truly yours.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'AI Friend',
    description: 'Chat with our friendly AI, trained to listen and help you with what\'s on your mind.',
  },
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: 'Track Your Wellbeing',
    description: 'Notice patterns in your mood, sleep, and stress to understand yourself better.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Peer Support',
    description: 'Connect with others who get it in our anonymous community forums.',
  },
];

export default function OnboardingPage() {
  const [isConsentModalOpen, setConsentModalOpen] = useState(false);

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const consentGiven = localStorage.getItem('consentGiven');
    if (!consentGiven) {
      e.preventDefault();
      setConsentModalOpen(true);
    }
  };

  const handleConsent = () => {
    localStorage.setItem('consentGiven', 'true');
    setConsentModalOpen(false);
    // After consent, we can programmatically navigate.
    // In this setup, the link will now work as intended.
    // A slight delay might be good for UX.
    setTimeout(() => {
      document.getElementById('enter-link')?.click();
    }, 100);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    A Safe Space to Figure Things Out.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    You're not alone. SafeSpace is a private, anonymous spot for students to find support, track their feelings, and talk things through.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    id="enter-link"
                    href="/dashboard"
                    onClick={handleEnter}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Enter SafeSpace
                  </Link>
                </div>
              </div>
               <Image
                src="https://picsum.photos/seed/safespace/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="calm serene landscape"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Here For You, 24/7</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SafeSpace gives you tools to handle life's ups and downs. No judgment, just support.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 lg:max-w-none xl:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="grid gap-4 p-6 rounded-lg bg-card shadow-sm">
                  {feature.icon}
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center h-16 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SafeSpace. All rights reserved.</p>
      </footer>
      <ConsentModal isOpen={isConsentModalOpen} onOpenChange={setConsentModalOpen} onConsent={handleConsent} />
    </div>
  );
}
