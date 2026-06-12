import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*  Enums                                                                     */
/* -------------------------------------------------------------------------- */

const trickCategoryEnum = z.enum([
  'FLIP',
  'OLLIE_VARIATION',
  'MANUAL',
  'GRIND_SLIDE',
  'GRAB',
]);

const trickDifficultyEnum = z.enum([
  'beginner',
  'intermediate',
  'advanced',
  'expert',
]);

const flipDirectionEnum = z.enum(['frontside', 'backside', 'none']);

const stanceEnum = z.enum([
  'regular',
  'goofy',
  'switch',
  'fakie',
  'nollie',
]);

const manualTypeEnum = z.enum(['manual', 'noseManual']);

const grindTypeEnum = z.enum(['grind', 'slide']);

/* -------------------------------------------------------------------------- */
/*  Base                                                                      */
/* -------------------------------------------------------------------------- */

const baseTrickSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').trim(),
  difficulty: trickDifficultyEnum,
  videoUrl: z
    .string()
    .url('URL inválida')
    .or(z.literal(''))
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});

/* -------------------------------------------------------------------------- */
/*  Category-specific schemas (discriminated union)                           */
/* -------------------------------------------------------------------------- */

const flipTrickSchema = baseTrickSchema.extend({
  category: z.literal('FLIP'),
  rotationDegrees: z
    .union([z.number(), z.string().transform(Number)])
    .pipe(z.number().int().min(0).max(1080))
    .optional(),
  flipDirection: flipDirectionEnum.optional(),
});

const ollieVariationSchema = baseTrickSchema.extend({
  category: z.literal('OLLIE_VARIATION'),
  stance: stanceEnum.optional(),
  height: z
    .union([z.number(), z.string().transform(Number)])
    .pipe(z.number().min(0))
    .optional(),
});

const manualTrickSchema = baseTrickSchema.extend({
  category: z.literal('MANUAL'),
  manualType: manualTypeEnum.optional(),
  distance: z
    .union([z.number(), z.string().transform(Number)])
    .pipe(z.number().min(0))
    .optional(),
});

const grindSlideSchema = baseTrickSchema.extend({
  category: z.literal('GRIND_SLIDE'),
  grindType: grindTypeEnum.optional(),
  obstacleType: z.string().trim().optional(),
});

const grabTrickSchema = baseTrickSchema.extend({
  category: z.literal('GRAB'),
  grabType: z.string().trim().optional(),
  airTime: z
    .union([z.number(), z.string().transform(Number)])
    .pipe(z.number().min(0))
    .optional(),
});

/* -------------------------------------------------------------------------- */
/*  Discriminated union                                                       */
/* -------------------------------------------------------------------------- */

export const createTrickSchema = z.discriminatedUnion('category', [
  flipTrickSchema,
  ollieVariationSchema,
  manualTrickSchema,
  grindSlideSchema,
  grabTrickSchema,
]);

/* -------------------------------------------------------------------------- */
/*  Inferred types                                                            */
/* -------------------------------------------------------------------------- */

export type CreateTrickFormValues = z.input<typeof createTrickSchema>;
export type CreateTrickParsed = z.output<typeof createTrickSchema>;