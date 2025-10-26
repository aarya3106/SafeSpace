'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts";
import { moodTrackerData, sleepTrackerData } from "@/lib/data";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function TrackerTabs() {
  return (
    <Tabs defaultValue="mood">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="mood">Mood</TabsTrigger>
        <TabsTrigger value="sleep">Sleep</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="stress">Stress</TabsTrigger>
      </TabsList>
      
      <TabsContent value="mood">
        <Card>
          <CardHeader>
            <CardTitle>Mood Tracker</CardTitle>
            <CardDescription>Log your mood throughout the day to see how it changes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Log New Mood Entry</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Mood (1=Sad, 10=Happy)</Label>
                        <Slider defaultValue={[5]} min={1} max={10} step={1} />
                    </div>
                     <div className="space-y-2">
                        <Label>Time of Day</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="morning">Morning</SelectItem>
                                <SelectItem value="afternoon">Afternoon</SelectItem>
                                <SelectItem value="evening">Evening</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <Button>Log Mood</Button>
                    </div>
                </CardContent>
            </Card>
            <div>
              <h3 className="font-semibold mb-4">Your Mood Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodTrackerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sleep">
        <Card>
          <CardHeader>
            <CardTitle>Sleep Tracker</CardTitle>
            <CardDescription>Track your sleep to improve your rest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Log Last Night's Sleep</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Hours Slept</Label>
                        <Input type="number" placeholder="e.g., 7.5" />
                    </div>
                    <div className="space-y-2">
                        <Label>Sleep Quality (1=Poor, 5=Excellent)</Label>
                        <Slider defaultValue={[3]} min={1} max={5} step={1} />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <Button>Log Sleep</Button>
                    </div>
                </CardContent>
            </Card>
            <div>
              <h3 className="font-semibold mb-4">Your Sleep Quality</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sleepTrackerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" name="Hours Slept" />
                  <Bar dataKey="quality" fill="hsl(var(--accent))" name="Sleep Quality" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {['activity', 'nutrition', 'stress'].map(tab => (
        <TabsContent key={tab} value={tab}>
            <Card>
                <CardHeader>
                    <CardTitle className="capitalize">{tab} Tracker</CardTitle>
                    <CardDescription>This feature is coming soon!</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                    <p>Check back later to track your {tab}.</p>
                </CardContent>
            </Card>
        </TabsContent>
      ))}

    </Tabs>
  );
}
