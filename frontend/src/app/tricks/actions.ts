'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerApiClient } from '@/lib/api';

export type DeleteTrickState = {
  success: boolean;
  error?: string;
};

export async function deleteTrickAction(
  _prevState: DeleteTrickState,
  formData: FormData,
): Promise<DeleteTrickState> {
  const id = formData.get('id') as string;

  if (!id) {
    return { success: false, error: 'ID da manobra não informado' };
  }

  try {
    const api = createServerApiClient();
    await api.deleteTrick(id);

    revalidatePath('/dashboard');
    revalidatePath('/tricks');

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Erro inesperado ao excluir manobra';
    return { success: false, error: message };
  }
}