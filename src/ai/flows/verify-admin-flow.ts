'use server';
/**
 * @fileOverview A flow to verify if a user is an admin based on their UID.
 *
 * - verifyAdmin - A function that checks if the user's UID matches the admin UID.
 * - VerifyAdminInput - The input type for the verifyAdmin function.
 * - VerifyAdminOutput - The return type for the verifyAdmin function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyAdminInputSchema = z.object({
  uid: z.string().describe('The UID of the user to verify.'),
});
export type VerifyAdminInput = z.infer<typeof VerifyAdminInputSchema>;

const VerifyAdminOutputSchema = z.object({
  isAdmin: z.boolean().describe('Whether the user is an administrator.'),
});
export type VerifyAdminOutput = z.infer<typeof VerifyAdminOutputSchema>;

export async function verifyAdmin(input: VerifyAdminInput): Promise<VerifyAdminOutput> {
  return verifyAdminFlow(input);
}

const verifyAdminFlow = ai.defineFlow(
  {
    name: 'verifyAdminFlow',
    inputSchema: VerifyAdminInputSchema,
    outputSchema: VerifyAdminOutputSchema,
  },
  async (input) => {
    // In a real application, you might check a database or use custom claims.
    // For now, we'll just check against a hardcoded admin UID.
    const isAdmin = input.uid === 'zMW1z5cRS1QbreKX16h1jNzoEm02';
    return { isAdmin };
  }
);
