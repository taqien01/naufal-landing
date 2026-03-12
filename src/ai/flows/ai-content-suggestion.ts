'use server';
/**
 * @fileOverview A Genkit flow for suggesting creative and theme-appropriate bio text and product descriptions.
 *
 * - suggestContent - A function that handles content suggestion.
 * - AiContentSuggestionInput - The input type for the suggestContent function.
 * - AiContentSuggestionOutput - The return type for the suggestContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiContentSuggestionInputSchema = z.object({
  contentType: z
    .enum(['bio', 'product_description'])
    .describe('The type of content to generate: "bio" or "product_description".'),
  theme: z
    .string()
    .describe('The chosen theme for the content, e.g., "One Piece" or "Naruto".'),
  additionalInfo: z
    .string()
    .optional()
    .describe(
      'Additional information, such as user interests for a bio or product details for a product description.'
    ),
});
export type AiContentSuggestionInput = z.infer<typeof AiContentSuggestionInputSchema>;

const AiContentSuggestionOutputSchema = z.object({
  suggestion: z.string().describe('The AI-generated creative and theme-appropriate text suggestion.'),
});
export type AiContentSuggestionOutput = z.infer<typeof AiContentSuggestionOutputSchema>;

export async function suggestContent(
  input: AiContentSuggestionInput
): Promise<AiContentSuggestionOutput> {
  return aiContentSuggestionFlow(input);
}

const aiContentSuggestionPrompt = ai.definePrompt({
  name: 'aiContentSuggestionPrompt',
  input: {schema: AiContentSuggestionInputSchema},
  output: {schema: AiContentSuggestionOutputSchema},
  prompt: `You are an AI assistant specialized in creating engaging and theme-appropriate text for teenagers.
Your task is to generate content based on the provided details.

Content Type: {{{contentType}}}
Theme: {{{theme}}}

{{#if additionalInfo}}
Additional Details: {{{additionalInfo}}}
{{/if}}

Based on the 'Content Type' and 'Theme', and 'Additional Details' if provided, generate a creative and engaging text.
If the 'Content Type' is "bio", create a profile bio for a teenager. Ensure it strongly reflects the "{{{theme}}}" theme and incorporates any mentioned interests. Keep it concise and impactful.
If the 'Content Type' is "product_description", write a compelling description for a digital product. The description should resonate with fans of the "{{{theme}}}" theme and highlight the unique aspects of the product.

Your output should be a JSON object with a single key "suggestion" containing the generated text.`,
});

const aiContentSuggestionFlow = ai.defineFlow(
  {
    name: 'aiContentSuggestionFlow',
    inputSchema: AiContentSuggestionInputSchema,
    outputSchema: AiContentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await aiContentSuggestionPrompt(input);
    return output!;
  }
);
