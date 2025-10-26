import { JournalView } from "@/components/journal/journal-view";
import { journalEntries } from "@/lib/data";

export default function JournalPage() {

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Your Private Journal</h1>
        <p className="text-muted-foreground">A space for your thoughts, feelings, and reflections. Completely private.</p>
      </div>
      <JournalView initialEntries={journalEntries} />
    </div>
  );
}
