import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export function FeatureCard({ title, description, href, icon }: FeatureCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-headline">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {icon}
        </CardHeader>
        <CardHeader>
            <div className="flex items-center text-sm font-medium text-primary">
                Go to {title.split(' ')[0]}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
