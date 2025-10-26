'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { counsellors } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookingModal } from '@/components/counsellors/booking-modal';
import type { Counsellor } from '@/lib/types';

export default function CounsellorsPage() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);

    const handleBookClick = (counsellor: Counsellor) => {
        setSelectedCounsellor(counsellor);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Book a Session</h1>
                <p className="text-muted-foreground">Our counsellors are here to listen and support you. All sessions are confidential.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {counsellors.map(counsellor => (
                    <Card key={counsellor.id}>
                        <CardHeader className="flex-row items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={`https://picsum.photos/seed/${counsellor.id}/128/128`} data-ai-hint="portrait person" />
                                <AvatarFallback>{counsellor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl font-headline">{counsellor.name}</CardTitle>
                                <CardDescription>Professional Counsellor</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className="font-semibold mb-2">Availability</h4>
                            <div className="flex flex-wrap gap-2">
                                {counsellor.availability.map(slot => (
                                    <Badge key={slot} variant="secondary">{slot}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleBookClick(counsellor)}>
                                Book Session with {counsellor.name}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {selectedCounsellor && (
                 <BookingModal 
                    isOpen={isBookingModalOpen} 
                    onOpenChange={setIsBookingModalOpen}
                    counsellor={selectedCounsellor}
                />
            )}
        </div>
    );
}
