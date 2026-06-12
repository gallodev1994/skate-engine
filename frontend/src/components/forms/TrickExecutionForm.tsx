'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { cn, getCategoryLabel, getDifficultyLabel, getDifficultyColor } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { TrickOutput, ExecuteTrickOutput } from '@/types/api';

interface TrickExecutionFormProps {
  tricks: TrickOutput[];
}

export function TrickExecutionForm({ tricks }: TrickExecutionFormProps) {
  const [selectedTrickId, setSelectedTrickId] = useState('');
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<ExecuteTrickOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedTrick = tricks.find((t) => t.id === selectedTrickId);

  const handleExecute = async () => {
    if (!selectedTrickId) return;

    setExecuting(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.executeTrick({
        trickId: selectedTrickId,
        skaterId: 'current-user',
        sessionId: `session-${Date.now()}`,
      });
      setResult(response);
    } catch (err) {
      setError('Erro ao executar manobra. Tente novamente.');
      console.error(err);
    } finally {
      setExecuting(false);
    }
  };

  if (tricks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Nenhuma manobra disponível para execução
        </p>
        <a
          href="/tricks/new"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          Criar manobra
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Select
        label="Selecionar Manobra"
        placeholder="Escolha uma manobra..."
        value={selectedTrickId}
        onChange={(e) => setSelectedTrickId(e.target.value)}
        options={tricks.map((t) => ({
          value: t.id,
          label: `${t.name} (${getCategoryLabel(t.category)})`,
        }))}
        disabled={executing}
      />

      {selectedTrick && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                {selectedTrick.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{selectedTrick.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {getCategoryLabel(selectedTrick.category)}
                </Badge>
                <Badge variant="outline" className={cn('text-xs', getDifficultyColor(selectedTrick.difficulty))}>
                  {getDifficultyLabel(selectedTrick.difficulty)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleExecute}
        disabled={executing || !selectedTrickId}
        className="w-full"
        size="lg"
        loading={executing}
      >
        {executing ? 'Executando...' : 'Executar Manobra'}
      </Button>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
          <XCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div
          className={cn(
            'flex items-center gap-3 p-4 rounded-lg animate-slide-up',
            result.success
              ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
          )}
        >
          {result.success ? (
            <CheckCircle className="h-6 w-6 flex-shrink-0" />
          ) : (
            <XCircle className="h-6 w-6 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="font-medium">
              {result.success ? 'Manobra executada com sucesso!' : 'Falha na execução'}
            </p>
            <p className="text-sm opacity-80">{result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}