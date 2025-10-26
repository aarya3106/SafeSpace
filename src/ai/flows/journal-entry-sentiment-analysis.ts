'use server';

/**
 * @fileOverview Analyzes the sentiment of a journal entry and suggests relevant peer support groups or resources.
 *
 * - analyzeJournalEntrySentiment - A function that handles the sentiment analysis and resource suggestion process.
 * - AnalyzeJournalEntrySentimentInput - The input type for the analyzeJournalEntrySentiment function.
 * - AnalyzeJournalEntrySentimentOutput - The return type for the analyzeJournalEntrySentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJournalEntrySentimentInputSchema = z.object({
  journalEntry: z.string().describe('The text content of the journal entry.'),
});
export type AnalyzeJournalEntrySentimentInput = z.infer<typeof AnalyzeJournalEntrySentimentInputSchema>;

const AnalyzeJournalEntrySentimentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the journal entry (e.g., positive, negative, neutral).'
    ),
  suggestedResources: z
    .array(z.string())
    .describe(
      'A list of relevant peer support groups or resources based on the sentiment.'
    ),
});
export type AnalyzeJournalEntrySentimentOutput = z.infer<typeof AnalyzeJournalEntrySentimentOutputSchema>;

export async function analyzeJournalEntrySentiment(
  input: AnalyzeJournalEntrySentimentInput
): Promise<AnalyzeJournalEntrySentimentOutput> {
  return analyzeJournalEntrySentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJournalEntrySentimentPrompt',
  input: {schema: AnalyzeJournalEntrySentimentInputSchema},
  output: {schema: AnalyzeJournalEntrySentimentOutputSchema},
  prompt: `You are a mental health assistant that analyzes the sentiment of journal entries and suggests relevant peer support groups or resources.

  Analyze the following journal entry and identify the sentiment. Based on the sentiment, suggest relevant peer support groups or resources. Return a JSON object with sentiment and suggestedResources fields.

  Journal Entry: {{{journalEntry}}}

  Ensure the sentiment field accurately reflects the overall tone of the journal entry, and the suggestedResources field contains specific and helpful resources that align with the identified sentiment.

  Output the result in JSON format:
  {
    "sentiment": "",
    "suggestedResources": ["", ""]
  }`,
});

const analyzeJournalEntrySentimentFlow = ai.defineFlow(
  {
    name: 'analyzeJournalEntrySentimentFlow',
    inputSchema: AnalyzeJournalEntrySentimentInputSchema,
    outputSchema: AnalyzeJournalEntrySentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
