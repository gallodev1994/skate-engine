'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCategoryLabel, getDifficultyLabel, getDifficultyColor, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import type { TrickOutput } from '@/types/api';

interface RecentTricksProps {
  tricks: TrickOutput[];
}

export function RecentTricks({ tricks }: RecentTricksProps) {
  if (tricks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhuma manobra cadastrada</p>
        <Link
          href="/tricks/new"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          Criar primeira manobra
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tricks.map((trick) => (
        <Link
          key={trick.id}
          href={`/tricks/${trick.id}`}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
              {trick.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">{trick.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {getCategoryLabel(trick.category)}
              </Badge>
              <Badge variant="outline" className={cn('text-xs', getDifficultyColor(trick.difficulty))}>
                {getDifficultyLabel(trick.difficulty)}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {formatDate(trick.createdAt)}
          </p>
        </Link>
      ))}
    </div>
  );
}