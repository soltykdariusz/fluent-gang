import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';
import { ChoiceOption } from '../../types/workout';

type Props = {
  choices: ChoiceOption[];
  selectedChoiceId?: string;
  correctChoiceId?: string;
  onChoose: (choiceId: string) => void;
};

export function ChoiceExercise({ choices, selectedChoiceId, correctChoiceId, onChoose }: Props) {
  const appTheme = useTheme();
  const answered = selectedChoiceId !== undefined;

  return (
    <View style={styles.options}>
      {choices.map((choice) => {
        const selected = selectedChoiceId === choice.id;
        const correct = answered && correctChoiceId === choice.id;

        return (
          <Pressable
            key={choice.id}
            accessibilityRole="button"
            onPress={() => onChoose(choice.id)}
            style={({ pressed }) => [
              styles.option,
              { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border },
              selected ? { borderColor: appTheme.colors.primary, backgroundColor: appTheme.colors.primarySoft } : null,
              correct ? { borderColor: appTheme.colors.success } : null,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={[styles.optionText, { color: appTheme.colors.text }]}>{choice.text}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: theme.spacing.sm,
  },
  option: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});
