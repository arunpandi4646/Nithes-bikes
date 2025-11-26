'use server';

import { verifyAdminAccess } from '@/ai/flows/admin-panel-verification';
import type { AdminAccessInput, AdminAccessOutput } from '@/ai/flows/admin-panel-verification';

export async function checkAdminStatus(userId: string): Promise<AdminAccessOutput> {
  const input: AdminAccessInput = { userId };
  try {
    const result = await verifyAdminAccess(input);
    return result;
  } catch (error) {
    console.error("Error verifying admin access:", error);
    // In case of an error in the flow, deny access.
    return { isAuthorized: false };
  }
}
