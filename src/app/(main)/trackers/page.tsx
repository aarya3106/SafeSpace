import { TrackerTabs } from "@/components/trackers/tracker-tabs";

export default function TrackersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Wellbeing Trackers</h1>
        <p className="text-muted-foreground">Track your mood, sleep, and more to understand your patterns.</p>
      </div>
      <TrackerTabs />
    </div>
  );
}
