'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerApiClient } from '@/lib/api';
import { createTrickSchema } from '@/lib/validation';

export type CreateTrickState = {
  success: boolean;
  error?: string;
  errors?: Record<string, string>;
};

export async function createTrickAction(
  _prevState: CreateTrickState,
  formData: FormData,
): Promise<CreateTrickState> {
  /* ---------- extract all fields from FormData ---------- */
  const raw: Record<string, unknown> = {};
  const entries = Array.from(formData.entries());

  for (const [key] of entries) {
    const value = formData.get(key);
    raw[key] = value instanceof File ? value : value;
  }

  /* ---------- validate with zod ---------- */
  const parsed = createTrickSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = issue.message;
      }
    }

    return { success: false, errors };
  }

  /* ---------- mutate ---------- */
  try {
    const api = createServerApiClient();
    await api.createTrick(parsed.data);

    revalidatePath('/dashboard');
    revalidatePath('/tricks');
    revalidatePath('/tricks/new');

    redirect('/dashboard');
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Erro inesperado ao criar manobra';
    return { success: false, error: message };
  }
}