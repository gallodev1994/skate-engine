'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { createTrickAction } from '@/app/tricks/new/actions';
import type { CreateTrickState } from '@/app/tricks/new/actions';
import { getCategoryLabel, getDifficultyLabel } from '@/lib/utils';
import {
  Sparkles,
  RotateCw,
  Move,
  Shuffle,
  Zap,
  Hand,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import type { TrickCategory } from '@/types/api';

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const CATEGORIES: TrickCategory[] = [
  'FLIP',
  'OLLIE_VARIATION',
  'MANUAL',
  'GRIND_SLIDE',
  'GRAB',
];

const FLIP_DIRECTIONS = [
  { value: '', label: 'Nenhum' },
  { value: 'frontside', label: 'Frontside' },
  { value: 'backside', label: 'Backside' },
];

const STANCES = [
  { value: '', label: 'Nenhum' },
  { value: 'regular', label: 'Regular' },
  { value: 'goofy', label: 'Goofy' },
  { value: 'switch', label: 'Switch' },
  { value: 'fakie', label: 'Fakie' },
  { value: 'nollie', label: 'Nollie' },
];

const MANUAL_TYPES = [
  { value: '', label: 'Nenhum' },
  { value: 'manual', label: 'Manual' },
  { value: 'noseManual', label: 'Nose Manual' },
];

const GRIND_TYPES = [
  { value: '', label: 'Nenhum' },
  { value: 'grind', label: 'Grind' },
  { value: 'slide', label: 'Slide' },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function categoryIcon(category: TrickCategory) {
  const icons: Record<TrickCategory, typeof Sparkles> = {
    FLIP: RotateCw,
    OLLIE_VARIATION: Move,
    MANUAL: Shuffle,
    GRIND_SLIDE: Zap,
    GRAB: Hand,
  };
  return icons[category];
}

function getCategoryPlaceholder(category: TrickCategory): string {
  const placeholders: Record<TrickCategory, string> = {
    FLIP: 'Ex: 180',
    OLLIE_VARIATION: 'Ex: 50',
    MANUAL: 'Ex: 5',
    GRIND_SLIDE: 'Ex: corrimão, borda',
    GRAB: 'Ex: Indy, Melon',
  };
  return placeholders[category];
}

/* -------------------------------------------------------------------------- */
/*  Initial state                                                             */
/* -------------------------------------------------------------------------- */

const initialState: CreateTrickState = {
  success: false,
};

/* -------------------------------------------------------------------------- */
/*  Dynamic fields per category                                               */
/* -------------------------------------------------------------------------- */

function CategoryFields({ category }: { category: TrickCategory | '' }) {
  switch (category) {
    case 'FLIP':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Rotação (graus)"
            name="rotationDegrees"
            type="number"
            placeholder="Ex: 180"
            min={0}
            max={1080}
            step={90}
          />
          <Select
            label="Direção do Flip"
            name="flipDirection"
            options={FLIP_DIRECTIONS}
          />
        </div>
      );

    case 'OLLIE_VARIATION':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Stance" name="stance" options={STANCES} />
          <Input
            label="Altura (cm)"
            name="height"
            type="number"
            placeholder="Ex: 50"
            min={0}
            step={5}
          />
        </div>
      );

    case 'MANUAL':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Tipo de Manual"
            name="manualType"
            options={MANUAL_TYPES}
          />
          <Input
            label="Distância (m)"
            name="distance"
            type="number"
            placeholder="Ex: 5"
            min={0}
            step={0.5}
          />
        </div>
      );

    case 'GRIND_SLIDE':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Tipo de Grind/Slide"
            name="grindType"
            options={GRIND_TYPES}
          />
          <Input
            label="Tipo de Obstáculo"
            name="obstacleType"
            type="text"
            placeholder="Ex: corrimão, borda"
          />
        </div>
      );

    case 'GRAB':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Tipo de Grab"
            name="grabType"
            type="text"
            placeholder="Ex: Indy, Melon"
          />
          <Input
            label="Tempo no ar (s)"
            name="airTime"
            type="number"
            placeholder="Ex: 1.5"
            min={0}
            step={0.1}
          />
        </div>
      );

    default:
      return (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Selecione uma categoria para ver os campos específicos.
        </p>
      );
  }
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function CreateTrickForm() {
  const [state, formAction, pending] = useFormState(
    createTrickAction,
    initialState,
  );
  const [category, setCategory] = useState<TrickCategory | ''>('');

  /* ---------- success state ---------- */
  if (state.success) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Manobra criada com sucesso!
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Redirecionando para o dashboard…
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form action={formAction}>
      <div className="space-y-6">
        {/* ---------- general fields ---------- */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary-500" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Nome da Manobra"
              name="name"
              type="text"
              placeholder="Ex: Kickflip, Heelflip, 50-50"
              required
              error={state.errors?.name}
            />

            <Input
              label="URL do Vídeo (opcional)"
              name="videoUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              error={state.errors?.videoUrl}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Dificuldade"
                name="difficulty"
                required
                error={state.errors?.difficulty}
                placeholder="Selecione a dificuldade"
                options={[
                  { value: 'beginner', label: getDifficultyLabel('beginner') },
                  {
                    value: 'intermediate',
                    label: getDifficultyLabel('intermediate'),
                  },
                  { value: 'advanced', label: getDifficultyLabel('advanced') },
                  { value: 'expert', label: getDifficultyLabel('expert') },
                ]}
              />

              <Select
                label="Categoria"
                name="category"
                required
                error={state.errors?.category}
                placeholder="Selecione a categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value as TrickCategory)}
                options={CATEGORIES.map((c) => ({
                  value: c,
                  label: getCategoryLabel(c),
                }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* ---------- category-specific fields ---------- */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {category ? (
                <>
                  {(() => {
                    const Icon = categoryIcon(category);
                    return <Icon className="h-5 w-5 text-primary-500" />;
                  })()}
                  Detalhes de {getCategoryLabel(category)}
                </>
              ) : (
                <>
                  <Move className="h-5 w-5 text-primary-500" />
                  Detalhes da Categoria
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryFields category={category} />
          </CardContent>
        </Card>

        {/* ---------- error banner ---------- */}
        {state.error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">
              {state.error}
            </p>
          </div>
        )}

        {/* ---------- actions ---------- */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            size="lg"
            loading={pending}
            className="min-w-[180px]"
          >
            {pending ? 'Criando…' : 'Criar Manobra'}
          </Button>
        </div>
      </div>
    </form>
  );
}