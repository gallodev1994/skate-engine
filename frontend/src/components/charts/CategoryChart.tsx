'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Sector,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { TrickCategory } from '@/types/api';

const COLORS = {
  FLIP: '#0ea5e9',
  OLLIE_VARIATION: '#22c55e',
  MANUAL: '#f59e0b',
  GRIND_SLIDE: '#ef4444',
  GRAB: '#a855f7',
};

const CATEGORY_LABELS: Record<TrickCategory, string> = {
  FLIP: 'Flip',
  OLLIE_VARIATION: 'Ollie Variação',
  MANUAL: 'Manual',
  GRIND_SLIDE: 'Grind/Slide',
  GRAB: 'Grab',
};

interface CategoryChartProps {
  data: Record<TrickCategory, number>;
  type?: 'bar' | 'pie';
  title: string;
}

export function CategoryChart({ data, type = 'bar', title }: CategoryChartProps) {
  const chartData = Object.entries(data).map(([category, value]) => ({
    category: CATEGORY_LABELS[category as TrickCategory] || category,
    value,
    color: COLORS[category as TrickCategory] || '#888',
    fullCategory: category,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
          Nenhum dado disponível
        </div>
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
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'pie' ? (
            <PieChart>
              <Pie
                data={chartData.filter((d) => d.value > 0)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                nameKey="category"
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.filter((d) => d.value > 0).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          ) : (
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <YAxis
                type="category"
                dataKey="category"
                width={120}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                maxBarSize={40}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {chartData.map((entry) => (
          <span
            key={entry.fullCategory}
            className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
          >
            <span
              className="h-3 w-3 rounded"
              style={{ backgroundColor: entry.color }}
            />
            {entry.category}: {entry.value}
          </span>
        ))}
      </div>
    </div>
  );
}