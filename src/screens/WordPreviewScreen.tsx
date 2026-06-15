import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Brain,
  BookOpen,
  Check,
  Columns2,
  CircleHelp,
  Dumbbell,
  Flame,
  Gauge,
  Heart,
  Newspaper,
  Pause,
  Play,
  Podcast,
  Sparkles,
  Swords,
  Trophy,
  Volume2,
} from 'lucide-react-native';
import { ReactNode, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import mockWorkoutWords from '../data/mockWorkoutWords.json';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { SelectedWord } from '../types/lesson';
import { RootStackParamList, WorkoutModule } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WordPreview'>;

type WorkoutTileTone = 'green' | 'blue' | 'yellow' | 'coral' | 'grape';

type WorkoutTile = {
  module: WorkoutModule;
  title: string;
  tone: WorkoutTileTone;
  icon: (color: string) => ReactNode;
};

function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const workoutTiles: WorkoutTile[] = [
  {
    module: 'context',
    title: 'Context',
    tone: 'yellow',
    icon: (color) => <BookOpen size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'the_news',
    title: 'The News',
    tone: 'green',
    icon: (color) => <Newspaper size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'use',
    title: 'Podcast',
    tone: 'blue',
    icon: (color) => <Podcast size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'speak',
    title: 'Shadowing',
    tone: 'coral',
    icon: (color) => <Volume2 size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'argue',
    title: 'Argue',
    tone: 'grape',
    icon: (color) => <Swords size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'ask',
    title: 'Ask',
    tone: 'blue',
    icon: (color) => <CircleHelp size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'super_memo',
    title: 'Super Memo',
    tone: 'yellow',
    icon: (color) => <Brain size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'feel',
    title: 'Feel',
    tone: 'coral',
    icon: (color) => <Heart size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'same_different',
    title: 'Same / Different',
    tone: 'green',
    icon: (color) => <Columns2 size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'best_sentence',
    title: 'Best Sentence',
    tone: 'grape',
    icon: (color) => <Sparkles size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'fast_flash',
    title: 'Fast Flash',
    tone: 'blue',
    icon: (color) => <Gauge size={28} color={color} strokeWidth={2.1} />,
  },
];

export function WordPreviewScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const focusTargetSeconds = useAppStore((state) => state.focusTargetSeconds);
  const focusRemainingSeconds = useAppStore((state) => state.focusRemainingSeconds);
  const focusRunning = useAppStore((state) => state.focusRunning);
  const startFocusSession = useAppStore((state) => state.startFocusSession);
  const pauseFocusSession = useAppStore((state) => state.pauseFocusSession);
  const { lesson, completedModules = [] } = route.params;
  const fallbackWord = mockWorkoutWords[0] as SelectedWord;
  const selectedWords = route.params.selectedWords?.length ? route.params.selectedWords : [fallbackWord];
  const sessionSize = route.params.sessionSize ?? lesson?.sessionSize ?? 1;
  const wordCount = sessionSize ?? selectedWords.length;
  const completedSet = new Set(completedModules);
  const completedCount = workoutTiles.filter((tile) => completedSet.has(tile.module)).length;

  useEffect(() => {
    if (!lesson) {
      return;
    }

    if (!focusRunning) {
      startFocusSession();
    }
  }, [
    focusRunning,
    lesson,
    startFocusSession,
  ]);

  const startWorkoutModule = (startModule: WorkoutModule) => {
    if (lesson) {
      navigation.navigate('ModuleRunner', { lesson, module: startModule, completedModules });
      return;
    }

    navigation.navigate('AdGate', {
      selectedWords,
      sessionSize: sessionSize ?? 3,
      mode: 'standardContext',
      startModule,
    });
  };

  return (
    <Screen>
      <View style={styles.guideWrap}>
        <Mascot
          state="encourage"
          size={56}
          message="Welcome to Word Gym. Choose any machine and train this word your way."
        />
      </View>

      <View style={[styles.scoreBar, { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border }]}>
        <View style={styles.focusScoreItem}>
          <FocusControl
            running={focusRunning}
            remainingSeconds={focusRemainingSeconds}
            targetSeconds={focusTargetSeconds}
            onPress={focusRunning ? pauseFocusSession : startFocusSession}
          />
          <View>
            <Text style={[styles.focusLabel, { color: appTheme.colors.muted }]}>Focus</Text>
            <Text style={[styles.focusValue, { color: appTheme.colors.muted }]}>{formatSeconds(focusRemainingSeconds)}</Text>
          </View>
        </View>
        <View style={styles.scoreItem}>
          <Dumbbell size={18} color={appTheme.colors.primary} strokeWidth={2.3} />
          <Text style={[styles.scoreText, { color: appTheme.colors.text }]}>{wordCount}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Trophy size={18} color={theme.colors.warning} strokeWidth={2.3} />
          <Text style={[styles.scoreText, { color: appTheme.colors.text }]}>{completedCount}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Flame size={18} color={theme.colors.danger} strokeWidth={2.3} />
          <Text style={[styles.scoreText, { color: appTheme.colors.text }]}>15</Text>
        </View>
        <View style={styles.scoreItem}>
          <Heart size={18} color={theme.colors.danger} strokeWidth={2.3} />
          <Text style={[styles.scoreText, { color: appTheme.colors.text }]}>5</Text>
        </View>
      </View>

      <WorkoutPath
        tiles={workoutTiles}
        completedSet={completedSet}
        textColor={appTheme.colors.text}
        surfaceColor={appTheme.colors.surface}
        borderColor={appTheme.colors.border}
        onPress={startWorkoutModule}
      />

      {lesson ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('WorkoutFinish', { lesson, completedModules })}
          style={({ pressed }) => [
            styles.finishButton,
            { backgroundColor: appTheme.colors.primarySoft },
            pressed ? styles.pressed : null,
          ]}
        >
          <Text style={[styles.finishText, { color: appTheme.colors.primary }]}>Finish workout</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}

function FocusControl({
  running,
  remainingSeconds,
  targetSeconds,
  onPress,
}: {
  running: boolean;
  remainingSeconds: number;
  targetSeconds: number;
  onPress: () => void;
}) {
  const appTheme = useTheme();
  const size = 34;
  const stroke = 2.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const elapsedProgress = targetSeconds > 0 ? 1 - Math.max(0, remainingSeconds) / targetSeconds : 0;
  const strokeDashoffset = circumference * (1 - Math.min(Math.max(elapsedProgress, 0), 1));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={running ? 'Pause focus timer' : 'Start focus timer'}
      onPress={onPress}
      style={({ pressed }) => [styles.focusButton, pressed ? styles.pressed : null]}
    >
      <Svg width={size} height={size} style={styles.focusRing}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={appTheme.colors.primarySoft}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={appTheme.colors.primary}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      {running ? (
        <Pause size={14} color={appTheme.colors.primary} fill={appTheme.colors.primary} strokeWidth={2.4} />
      ) : (
        <Play size={14} color={appTheme.colors.primary} fill={appTheme.colors.primary} strokeWidth={2.4} />
      )}
    </Pressable>
  );
}

function WorkoutPath({
  tiles,
  completedSet,
  textColor,
  surfaceColor,
  borderColor,
  onPress,
}: {
  tiles: WorkoutTile[];
  completedSet: Set<WorkoutModule>;
  textColor: string;
  surfaceColor: string;
  borderColor: string;
  onPress: (module: WorkoutModule) => void;
}) {
  return (
    <View style={styles.path}>
      {tiles.map((tile, index) => (
        <PathNode
          key={tile.module}
          tile={tile}
          index={index}
          done={completedSet.has(tile.module)}
          textColor={textColor}
          surfaceColor={surfaceColor}
          borderColor={borderColor}
          onPress={() => onPress(tile.module)}
        />
      ))}
    </View>
  );
}

function PathNode({
  tile,
  index,
  done,
  textColor,
  surfaceColor,
  borderColor,
  onPress,
}: {
  tile: WorkoutTile;
  index: number;
  done: boolean;
  textColor: string;
  surfaceColor: string;
  borderColor: string;
  onPress: () => void;
}) {
  const tone = getNodeTone(tile.tone);

  return (
    <View style={styles.nodeCell}>
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.nodePress, pressed ? styles.pressed : null]}>
        <View style={[styles.nodeOuter, { backgroundColor: tone.soft, borderColor: done ? tone.color : borderColor }]}>
          <View style={[styles.nodeInner, { backgroundColor: surfaceColor, borderColor: tone.color }]}>
            {tile.icon(tone.color)}
          </View>
          <View style={[styles.nodeBadge, { backgroundColor: done ? tone.color : theme.colors.warning }]}>
            {done ? (
              <Check size={13} color={theme.colors.surface} strokeWidth={2.6} />
            ) : (
              <Text style={styles.nodeBadgeText}>{index + 1}</Text>
            )}
          </View>
        </View>
        <Text style={[styles.nodeTitle, { color: textColor }]}>{tile.title}</Text>
      </Pressable>
    </View>
  );
}

function getNodeTone(tone: WorkoutTileTone) {
  if (tone === 'blue') return { color: theme.colors.accent, soft: theme.colors.accentSoft };
  if (tone === 'yellow') return { color: theme.colors.warning, soft: theme.colors.warningSoft };
  if (tone === 'coral') return { color: theme.colors.danger, soft: theme.colors.dangerSoft };
  if (tone === 'grape') return { color: theme.colors.ai, soft: theme.colors.aiSoft };
  return { color: theme.colors.primary, soft: theme.colors.primarySoft };
}

const styles = StyleSheet.create({
  guideWrap: {
    marginTop: 2,
  },
  scoreBar: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  focusScoreItem: {
    minWidth: 104,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  focusButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusRing: {
    position: 'absolute',
  },
  focusLabel: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  focusValue: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '800',
  },
  scoreItem: {
    minWidth: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  scoreText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  path: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    rowGap: theme.spacing.xl,
    columnGap: '3.5%',
  },
  nodeCell: {
    width: '31%',
    alignItems: 'center',
  },
  nodePress: {
    width: '100%',
    alignItems: 'center',
    gap: 5,
  },
  nodeOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeBadge: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  nodeBadgeText: {
    color: theme.colors.surface,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
  },
  nodeTitle: {
    minHeight: 34,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
  },
  finishButton: {
    minHeight: 48,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  finishText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});
