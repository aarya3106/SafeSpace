'use server';

/**
 * @fileOverview A flow for generating a starting point for a journal entry.
 *
 * - generateStartingJournalEntry - A function that generates a starting point for a journal entry based on a prompt.
 * - GenerateStartingJournalEntryInput - The input type for the generateStartingJournalEntry function.
 * - GenerateStartingJournalEntryOutput - The return type for the generateStartingJournalEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStartingJournalEntryInputSchema = z.object({
  prompt: z.string().describe('The prompt or topic for the journal entry.'),
});
export type GenerateStartingJournalEntryInput = z.infer<typeof GenerateStartingJournalEntryInputSchema>;

const GenerateStartingJournalEntryOutputSchema = z.object({
  startingText: z.string().describe('The generated starting text for the journal entry.'),
});
export type GenerateStartingJournalEntryOutput = z.infer<typeof GenerateStartingJournalEntryOutputSchema>;

export async function generateStartingJournalEntry(
  input: GenerateStartingJournalEntryInput
): Promise<GenerateStartingJournalEntryOutput> {
  return generateStartingJournalEntryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStartingJournalEntryPrompt',
  input: {schema: GenerateStartingJournalEntryInputSchema},
  output: {schema: GenerateStartingJournalEntryOutputSchema},
  prompt: `You are a helpful assistant designed to help users overcome writer's block.

You will generate a starting point for a journal entry based on the provided prompt or topic.

Prompt: {{{prompt}}}

Starting text: `,
});

const generateStartingJournalEntryFlow = ai.defineFlow(
  {
    name: 'generateStartingJournalEntryFlow',
    inputSchema: GenerateStartingJournalEntryInputSchema,
    outputSchema: GenerateStartingJournalEntryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
