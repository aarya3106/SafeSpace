'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PanelLeft,
  Home,
  BookText,
  Headphones,
  Users,
  BarChart3,
  CalendarPlus,
  Bot,
  User,
  LogOut,
  LifeBuoy
} from 'lucide-react';
import { UrgentHelpModal } from './urgent-help-modal';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/journal', icon: BookText, label: 'Journal' },
  { href: '/relaxation', icon: Headphones, label: 'Relaxation' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/trackers', icon: BarChart3, label: 'Trackers' },
  { href: '/counsellors', icon: CalendarPlus, label: 'Counsellors' },
  { href: '/chatbot', icon: Bot, label: 'AI Chat' },
];

export default function AppHeader() {
  const [isUrgentHelpOpen, setUrgentHelpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <LifeBuoy className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">SafeSpace</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        <h1 className="text-xl font-semibold font-headline hidden sm:block">Dashboard</h1>
      </div>
       <Button variant="destructive" className="hidden sm:inline-flex" onClick={() => setUrgentHelpOpen(true)}>
        I Need Urgent Help
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Export My Data</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete My Data</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Logout Session
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UrgentHelpModal isOpen={isUrgentHelpOpen} onOpenChange={setUrgentHelpOpen} />
    </header>
  );
}
