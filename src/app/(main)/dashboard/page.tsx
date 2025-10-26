import Link from 'next/link';
import {
  BookText,
  Headphones,
  Users,
  BarChart3,
  CalendarPlus,
  Bot,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { MotivationalQuote } from '@/components/dashboard/motivational-quote';
import { FeatureCard } from '@/components/dashboard/feature-card';

const features = [
  {
    title: 'Write in Your Journal',
    description: 'Let your thoughts flow in a private, secure space.',
    href: '/journal',
    icon: <BookText className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Relaxation Tools',
    description: 'Listen to calming sounds and try breathing exercises.',
    href: '/relaxation',
    icon: <Headphones className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Community Support',
    description: 'Connect with peers who understand what you\'re going through.',
    href: '/community',
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Track Your Wellbeing',
    description: 'Notice patterns in your mood, sleep, and daily activities.',
    href: '/trackers',
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Talk to our AI Bot',
    description: 'A friendly ear is always available to chat, 24/7.',
    href: '/chatbot',
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Book a Counsellor',
    description: 'Schedule a confidential session with a professional.',
    href: '/counsellors',
    icon: <CalendarPlus className="h-8 w-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome to Your SafeSpace</h1>
        <p className="text-muted-foreground">What would you like to do today?</p>
      </div>
      
      <MotivationalQuote />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.href} {...feature} />
        ))}
      </div>
    </div>
  );
}
