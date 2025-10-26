'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, BrainCircuit, Sparkles } from "lucide-react";
import type { JournalEntry } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { analyzeJournalEntrySentiment, generateStartingJournalEntry } from "@/ai/flows";

interface JournalViewProps {
  initialEntries: JournalEntry[];
}

export function JournalView({ initialEntries }: JournalViewProps) {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState("all");
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryMood, setNewEntryMood] = useState<JournalEntry['mood']>('Okay');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    try {
        const { startingText } = await generateStartingJournalEntry({ prompt: "something I'm worried about" });
        setNewEntryContent(startingText);
    } catch(error) {
        console.error("AI prompt generation failed:", error);
        toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not generate a starting prompt. Please try again.",
        });
    } finally {
        setIsGenerating(false);
    }
  }

  const handleSaveEntry = async () => {
    const newEntry: JournalEntry = {
        id: (entries.length + 1).toString(),
        date: new Date().toISOString().split('T')[0],
        mood: newEntryMood,
        content: newEntryContent,
        tags: [],
    };
    setEntries([newEntry, ...entries]);
    setIsNewEntryDialogOpen(false);
    setNewEntryContent("");

    toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved.",
    });

    try {
        const { sentiment, suggestedResources } = await analyzeJournalEntrySentiment({ journalEntry: newEntry.content });
        toast({
            title: `Sentiment: ${sentiment}`,
            description: `Suggested resources: ${suggestedResources.join(', ')}`,
        });
    } catch (error) {
        console.error("Sentiment analysis failed:", error);
        // Silently fail, main action (saving) is done.
    }
  };

  const filteredEntries = entries
    .filter(entry => filterMood === 'all' || entry.mood === filterMood)
    .filter(entry => entry.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search entries..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={filterMood} onValueChange={setFilterMood}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by mood" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Moods</SelectItem>
                    <SelectItem value="Happy">Happy</SelectItem>
                    <SelectItem value="Okay">Okay</SelectItem>
                    <SelectItem value="Anxious">Anxious</SelectItem>
                    <SelectItem value="Sad">Sad</SelectItem>
                    <SelectItem value="Angry">Angry</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Entry
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>New Journal Entry</DialogTitle>
                    <DialogDescription>
                        Write down what's on your mind. It's safe here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Textarea 
                        placeholder="Start writing..." 
                        className="min-h-[200px]"
                        value={newEntryContent}
                        onChange={(e) => setNewEntryContent(e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                         <div className="grid gap-2">
                            <Label htmlFor="mood">How are you feeling?</Label>
                            <Select value={newEntryMood} onValueChange={(value) => setNewEntryMood(value as JournalEntry['mood'])}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a mood" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Happy">😊 Happy</SelectItem>
                                    <SelectItem value="Okay">🙂 Okay</SelectItem>
                                    <SelectItem value="Anxious">😟 Anxious</SelectItem>
                                    <SelectItem value="Sad">😢 Sad</SelectItem>
                                    <SelectItem value="Angry">😠 Angry</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <Button variant="ghost" onClick={handleGeneratePrompt} disabled={isGenerating}>
                           {isGenerating ? <Sparkles className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                            {isGenerating ? 'Generating...' : "Feeling stuck?"}
                         </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewEntryDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveEntry}>Save Entry</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntries.map(entry => (
            <Card key={entry.id}>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <Badge variant={entry.mood === 'Happy' || entry.mood === 'Okay' ? 'default' : 'secondary'}>{entry.mood}</Badge>
                    </CardTitle>
                    <CardDescription>Tags: {entry.tags.join(', ')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="line-clamp-4 text-muted-foreground">{entry.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                </CardFooter>
            </Card>
        ))}
      </div>
       {filteredEntries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
              <p>No journal entries found.</p>
              <p>Click "New Entry" to start writing.</p>
          </div>
       )}
    </>
  );
}
