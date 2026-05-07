import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  BookOpen,
  Check,
  CheckCircle2,
  Columns2,
  Gauge,
  Heart,
  MessageCircle,
  Sparkles,
  Volume2,
} from 'lucide-react-native';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList, WorkoutModule } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WordPreview'>;

type WorkoutTile = {
  module: WorkoutModule;
  title: string;
  group: 'main' | 'extra';
  icon: (color: string) => ReactNode;
};

const workoutTiles: WorkoutTile[] = [
  {
    module: 'read',
    title: 'Read',
    group: 'main',
    icon: (color) => <BookOpen size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'check',
    title: 'Check',
    group: 'main',
    icon: (color) => <CheckCircle2 size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'use',
    title: 'Use',
    group: 'main',
    icon: (color) => <MessageCircle size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'speak',
    title: 'Speak',
    group: 'main',
    icon: (color) => <Volume2 size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'feel',
    title: 'Feel',
    group: 'extra',
    icon: (color) => <Heart size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'sameDifferent',
    title: 'Same / Different',
    group: 'extra',
    icon: (color) => <Columns2 size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'bestSentence',
    title: 'Best Sentence',
    group: 'extra',
    icon: (color) => <Sparkles size={28} color={color} strokeWidth={2.1} />,
  },
  {
    module: 'fastFlash',
    title: 'Fast Flash',
    group: 'extra',
    icon: (color) => <Gauge size={28} color={color} strokeWidth={2.1} />,
  },
];

const mainTiles = workoutTiles.filter((tile) => tile.group === 'main');
const extraTiles = workoutTiles.filter((tile) => tile.group === 'extra');

export function WordPreviewScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const { lesson, completedModules = [] } = route.params;
  const selectedWords = route.params.selectedWords ?? [];
  const sessionSize = route.params.sessionSize ?? lesson?.sessionSize;
  const wordCount = sessionSize ?? selectedWords.length;
  const completedSet = new Set(completedModules);

  const startWorkoutModule = (startModule: WorkoutModule) => {
    if (lesson) {
      const moduleParams = { lesson, completedModules };
      if (startModule === 'check') {
        navigation.navigate('ContextQuiz', moduleParams);
        return;
      }
      if (startModule === 'use') {
        navigation.navigate('GuidedUsage', moduleParams);
        return;
      }
      if (startModule === 'speak') {
        navigation.navigate('Shadowing', moduleParams);
        return;
      }
      if (
        startModule === 'feel' ||
        startModule === 'sameDifferent' ||
        startModule === 'bestSentence' ||
        startModule === 'fastFlash'
      ) {
        navigation.navigate('PracticeMode', { ...moduleParams, module: startModule });
        return;
      }
      navigation.navigate('ReadingLesson', moduleParams);
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
      <View style={styles.topBar}>
        <View>
          <Text style={[styles.kicker, { color: appTheme.colors.muted }]}>Today</Text>
          <Text style={[styles.title, { color: appTheme.colors.text }]}>Word workout</Text>
        </View>
        <View style={[styles.pointsPill, { backgroundColor: appTheme.colors.primarySoft }]}>
          <Text style={[styles.points, { color: appTheme.colors.primary }]}>0 pts</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Text style={[styles.statText, { color: appTheme.colors.muted }]}>{wordCount} words</Text>
        <Text style={[styles.statText, { color: appTheme.colors.muted }]}>{completedSet.size}/8 done</Text>
      </View>

      <WorkoutSection
        title="Main workout"
        tiles={mainTiles}
        completedSet={completedSet}
        color={appTheme.colors.primary}
        textColor={appTheme.colors.text}
        mutedColor={appTheme.colors.muted}
        surfaceColor={appTheme.colors.surface}
        borderColor={appTheme.colors.border}
        onPress={startWorkoutModule}
      />
      <WorkoutSection
        title="Extra practice"
        tiles={extraTiles}
        completedSet={completedSet}
        color={appTheme.colors.primary}
        textColor={appTheme.colors.text}
        mutedColor={appTheme.colors.muted}
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

function WorkoutSection({
  title,
  tiles,
  completedSet,
  color,
  textColor,
  mutedColor,
  surfaceColor,
  borderColor,
  onPress,
}: {
  title: string;
  tiles: WorkoutTile[];
  completedSet: Set<WorkoutModule>;
  color: string;
  textColor: string;
  mutedColor: string;
  surfaceColor: string;
  borderColor: string;
  onPress: (module: WorkoutModule) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: mutedColor }]}>{title}</Text>
      <View style={styles.grid}>
        {tiles.map((tile) => (
          <ModuleTile
            key={tile.module}
            tile={tile}
            done={completedSet.has(tile.module)}
            color={color}
            textColor={textColor}
            surfaceColor={surfaceColor}
            borderColor={borderColor}
            onPress={() => onPress(tile.module)}
          />
        ))}
      </View>
    </View>
  );
}

function ModuleTile({
  tile,
  done,
  color,
  textColor,
  surfaceColor,
  borderColor,
  onPress,
}: {
  tile: WorkoutTile;
  done: boolean;
  color: string;
  textColor: string;
  surfaceColor: string;
  borderColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { backgroundColor: surfaceColor, borderColor },
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.doneSlot}>
        {done ? <Check size={16} color={color} strokeWidth={2.4} /> : null}
      </View>
      <View style={styles.iconWrap}>{tile.icon(color)}</View>
      <Text style={[styles.tileTitle, { color: textColor }]}>{tile.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topBar: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  kicker: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
  },
  pointsPill: {
    minWidth: 66,
    minHeight: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  points: {
    fontSize: 14,
    fontWeight: '900',
  },
  statsRow: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  statText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  tile: {
    width: '22.5%',
    aspectRatio: 1,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    padding: theme.spacing.sm,
  },
  doneSlot: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileTitle: {
    minHeight: 34,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
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
