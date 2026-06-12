import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
    advanced: 'bg-orange-100 text-orange-800 border-orange-200',
    expert: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-800 border-gray-200';
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    FLIP: 'rotate-ccw',
    OLLIE_VARIATION: 'move-diagonal',
    MANUAL: 'minimize-2',
    GRIND_SLIDE: 'zap',
    GRAB: 'hand',
  };
  return icons[category] || 'help-circle';
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    FLIP: 'Flip',
    OLLIE_VARIATION: 'Ollie Variação',
    MANUAL: 'Manual',
    GRIND_SLIDE: 'Grind/Slide',
    GRAB: 'Grab',
  };
  return labels[category] || category;
}

export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
    expert: 'Expert',
  };
  return labels[difficulty] || difficulty;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}