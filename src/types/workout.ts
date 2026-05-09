import { WorkoutModule } from './navigation';

export type WorkoutModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type CharacterEmotion =
  | 'idle'
  | 'talking'
  | 'thinking'
  | 'confident'
  | 'confused'
  | 'happy'
  | 'surprised'
  | 'arguing'
  | 'celebrating';

export type ChoiceOption = {
  id: string;
  text: string;
};

export type CharacterDialogueLine = {
  characterId: string;
  characterName: string;
  emotion: CharacterEmotion;
  text: string;
};

export type WorkoutRound = {
  id: string;
  moduleType: WorkoutModule;
  wordId: string;
  roundIndex: number;
  prompt: string;
  content: string;
  choices?: ChoiceOption[];
  correctChoiceId?: string;
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
  dialogueLines?: CharacterDialogueLine[];
  extraDialogueLines?: CharacterDialogueLine[];
  targetWord: string;
};

export type WorkoutModuleData = {
  id: string;
  type: WorkoutModule;
  title: string;
  subtitle: string;
  icon: string;
  isCore: boolean;
  isOptional: boolean;
  status: WorkoutModuleStatus;
  rounds: WorkoutRound[];
  progress: {
    completedRounds: number;
    totalRounds: number;
  };
};
