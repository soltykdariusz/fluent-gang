import { LevelCode } from '../types/language';

export const levelWordTargets: Record<LevelCode, number> = {
  A1: 500,
  A2: 1000,
  B1: 1800,
  B2: 2800,
  C1: 4000,
  C2: 5500,
};

export const nextLevelByLevel: Record<LevelCode, LevelCode> = {
  A1: 'A2',
  A2: 'B1',
  B1: 'B2',
  B2: 'C1',
  C1: 'C2',
  C2: 'C2',
};
