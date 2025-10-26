'use server';

/**
 * @fileOverview A Genkit flow that analyzes user journal entries and tracker data to provide personalized recommendations.
 *
 * - chatbotPersonalizedRecommendations - A function that provides personalized recommendations based on user data.
 * - ChatbotPersonalizedRecommendationsInput - The input type for the chatbotPersonalizedRecommendations function.
 * - ChatbotPersonalizedRecommendationsOutput - The return type for the chatbotPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotPersonalizedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  recentJournalEntries: z.array(z.string()).describe('A list of recent journal entries.'),
  trackerData: z.string().describe('Aggregated tracker data with consent.'),
});
export type ChatbotPersonalizedRecommendationsInput = z.infer<typeof ChatbotPersonalizedRecommendationsInputSchema>;

const ChatbotPersonalizedRecommendationsOutputSchema = z.object({
  recommendationText: z.string().describe('Personalized recommendation text for relaxation exercises or counsellor booking.'),
  suggestedAction: z.string().describe('Suggested action based on the recommendation (e.g., book_counsellor, play_breathing_exercise).'),
});
export type ChatbotPersonalizedRecommendationsOutput = z.infer<typeof ChatbotPersonalizedRecommendationsOutputSchema>;

export async function chatbotPersonalizedRecommendations(input: ChatbotPersonalizedRecommendationsInput): Promise<ChatbotPersonalizedRecommendationsOutput> {
  return chatbotPersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPersonalizedRecommendationsPrompt',
  input: {schema: ChatbotPersonalizedRecommendationsInputSchema},
  output: {schema: ChatbotPersonalizedRecommendationsOutputSchema},
  prompt: `You are SafeSpace, an empathetic mental health assistant providing personalized recommendations based on user data.

  Analyze the following journal entries and tracker data to provide a personalized recommendation for relaxation exercises or counsellor booking.

  Recent Journal Entries:
  {{#each recentJournalEntries}}
  - {{{this}}}
  {{/each}}

  Tracker Data (with consent):
  {{trackerData}}

  Based on this information, provide a recommendation and suggested action.  The suggested action must be one of book_counsellor or play_breathing_exercise.

  Return a JSON object with the following format: {recommendationText, suggestedAction}.  Do not return any other text other than the JSON object.
  `,
});

const chatbotPersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'chatbotPersonalizedRecommendationsFlow',
    inputSchema: ChatbotPersonalizedRecommendationsInputSchema,
    outputSchema: ChatbotPersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
