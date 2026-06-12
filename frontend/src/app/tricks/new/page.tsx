import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { CreateTrickForm } from '@/components/forms/CreateTrickForm';

export const metadata: Metadata = {
  title: 'Nova Manobra | Skate Trick Engine',
  description: 'Crie uma nova manobra de skate com parâmetros personalizados',
};

export default function NewTrickPage() {
  return (
    <MainLayout>
      <div className="animate-slide-up space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Criar Nova Manobra
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Defina o nome, categoria, dificuldade e parâmetros específicos da
            manobra.
          </p>
        </div>

        <CreateTrickForm />
      </div>
    </MainLayout>
  );
}