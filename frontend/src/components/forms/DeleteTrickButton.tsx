'use client';

import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { deleteTrickAction } from '@/app/tricks/actions';
import { Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface DeleteTrickButtonProps {
  trickId: string;
  trickName: string;
}

export function DeleteTrickButton({ trickId, trickName }: DeleteTrickButtonProps) {
  const [confirmed, setConfirmed] = useState(false);

  const handleDelete = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    const formData = new FormData();
    formData.set('id', trickId);
    await deleteTrickAction({ success: false }, formData);
  };

  if (confirmed) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-600 dark:text-red-400">
          Confirmar?
        </span>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={handleDelete}
        >
          Sim, excluir
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setConfirmed(false)}
        >
          Cancelar
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      className="text-gray-400 hover:text-red-600"
      aria-label={`Excluir ${trickName}`}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}