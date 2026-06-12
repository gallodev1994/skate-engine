'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: '#22c55e',
  intermediate: '#3b82f6',
  advanced: '#f59e0b',
  expert: '#ef4444',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
  expert: 'Expert',
};

interface DifficultyChartProps {
  data: Record<string, number>;
  title: string;
}

export function DifficultyChart({ data, title }: DifficultyChartProps) {
  const chartData = Object.entries(data)
    .filter(([, value]) => value > 0)
    .map(([difficulty, value]) => ({
      difficulty: DIFFICULTY_LABELS[difficulty] || difficulty,
      value,
      color: DIFFICULTY_COLORS[difficulty] || '#888',
      key: difficulty,
    }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Nenhum dado disponível</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.value} tricks ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
          <YAxis
            type="category"
            dataKey="difficulty"
            width={100}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-2">
        {chartData.map((entry) => (
          <span
            key={entry.key}
            className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
          >
            <span
              className="h-3 w-3 rounded"
              style={{ backgroundColor: entry.color }}
            />
            {entry.difficulty}: {entry.value}
          </span>
        ))}
      </div>
    </>
  );
}