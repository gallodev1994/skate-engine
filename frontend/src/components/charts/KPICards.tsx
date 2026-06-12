'use client';

import { TrendingUp, TrendingDown, Target, Users, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OverallStatsOutput } from '@/types/api';

interface KPICardsProps {
  stats: OverallStatsOutput;
}

const kpiData = [
  {
    key: 'totalTricks',
    label: 'Total de Tricks',
    icon: Target,
    color: 'text-primary-600 bg-primary-100 dark:bg-primary-900/30',
    trend: null,
  },
  {
    key: 'totalExecutions',
    label: 'Total de Execuções',
    icon: Users,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    trend: null,
  },
  {
    key: 'overallSuccessRate',
    label: 'Taxa de Sucesso',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    trend: 'up',
  },
  {
    key: 'avgSuccessRate',
    label: 'Média por Trick',
    icon: TrendingUp,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    trend: 'up',
  },
];

export function KPICards({ stats }: KPICardsProps) {
  const avgSuccessRate = stats.totalTricks > 0
    ? stats.overallSuccessRate / stats.totalTricks
    : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => {
        let value: string | number;
        switch (kpi.key) {
          case 'totalTricks':
            value = stats.totalTricks;
            break;
          case 'totalExecutions':
            value = stats.totalExecutions;
            break;
          case 'overallSuccessRate':
            value = `${(stats.overallSuccessRate * 100).toFixed(1)}%`;
            break;
          case 'avgSuccessRate':
            value = `${(avgSuccessRate * 100).toFixed(1)}%`;
            break;
          default:
            value = 0;
        }

        return (
          <div
            key={kpi.key}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
              <div className={cn('p-3 rounded-lg', kpi.color)}>
                <kpi.icon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            {kpi.trend && (
              <div className="mt-4 flex items-center gap-1 text-sm">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" aria-hidden="true" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" aria-hidden="true" />
                )}
                <span className={cn('font-medium', kpi.trend === 'up' ? 'text-green-600' : 'text-red-600')}>
                  {kpi.trend === 'up' ? '+12.5%' : '-8.2%'}
                </span>
                <span className="text-gray-500 dark:text-gray-400">vs mês anterior</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}