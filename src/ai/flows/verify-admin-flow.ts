'use server';
/**
 * @fileOverview A flow to verify if a user is an admin based on their UID.
 *
 * - verifyAdmin - A function that checks if the user's UID matches the admin UID.
 * - VerifyAdminInput - The input type for the verifyAdmin function.
 * - VerifyAdminOutput - The return type for the verifyAdmin function.
 */

import { ai } from '@/ai/genkit';
import { initializeFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
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
  async ({ uid }) => {
    try {
      const { firestore } = initializeFirebase();
      const adminRoleDoc = doc(firestore, 'roles_admin', uid);
      const docSnap = await getDoc(adminRoleDoc);
      
      // The user is an admin if a document with their UID exists in the roles_admin collection.
      const isAdmin = docSnap.exists();

      return { isAdmin };
    } catch (error) {
      console.error('Error verifying admin status in flow:', error);
      // In case of an error, default to not being an admin for security.
      return { isAdmin: false };
    }
  }
);
