import { Metadata } from 'next';
import { createServerApiClient } from '@/lib/api';
import { MainLayout } from '@/components/layout/MainLayout';
import { KPICards } from '@/components/charts/KPICards';
import { CategoryChart } from '@/components/charts/CategoryChart';
import { DifficultyChart } from '@/components/charts/DifficultyChart';
import { RecentTricks } from '@/components/charts/RecentTricks';
import { TrickExecutionForm } from '@/components/forms/TrickExecutionForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { OverallStatsOutput, ListTricksOutput, TrickOutput } from '@/types/api';

export const metadata: Metadata = {
  title: 'Dashboard | Skate Trick Engine',
  description: 'Visão geral das manobras e estatísticas',
};

async function getDashboardData() {
  const api = createServerApiClient();
  
  const [overallStats, tricksList] = await Promise.all([
    api.getOverallStats().catch(() => null),
    api.listTricks({ limit: 10 }).catch(() => null),
  ]);

  return {
    overallStats,
    tricksList,
  };
}

export default async function DashboardPage() {
  const { overallStats, tricksList } = await getDashboardData();

  const defaultStats: OverallStatsOutput = {
    totalTricks: 0,
    totalExecutions: 0,
    overallSuccessRate: 0,
    tricksByCategory: {
      FLIP: 0,
      OLLIE_VARIATION: 0,
      MANUAL: 0,
      GRIND_SLIDE: 0,
      GRAB: 0,
    },
    tricksByDifficulty: {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
      expert: 0,
    },
    period: 'all',
  };

  const stats = overallStats || defaultStats;
  const tricks = tricksList?.tricks || [];

  return (
    <MainLayout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Visão geral das suas manobras e estatísticas de execução
            </p>
          </div>
        </div>

        <KPICards stats={stats} />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tricks por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryChart data={stats.tricksByCategory} title="Distribuição por Categoria" type="pie" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tricks por Dificuldade</CardTitle>
            </CardHeader>
            <CardContent>
              <DifficultyChart data={stats.tricksByDifficulty} title="Distribuição por Dificuldade" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tricks Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTricks tricks={tricks} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Executar Manobra</CardTitle>
            </CardHeader>
            <CardContent>
              <TrickExecutionForm tricks={tricks} />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}