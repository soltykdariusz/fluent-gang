import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';
import { ChunkOption } from '../../types/workout';

type Props = {
  chunks: ChunkOption[];
  selectedChunkIds: string[];
  correctOrder: string[];
  checked: boolean;
  rejectedChunkIds?: string[];
  onAdd: (chunkId: string) => void;
  onRemove: (chunkId: string) => void;
  onCheck: () => void;
};

export function ChunkArrangeExercise({
  chunks,
  selectedChunkIds,
  correctOrder,
  checked,
  rejectedChunkIds = [],
  onAdd,
  onRemove,
  onCheck,
}: Props) {
  const appTheme = useTheme();
  const selectedSet = new Set(selectedChunkIds);
  const rejectedSet = new Set(rejectedChunkIds);
  const selectedChunks = selectedChunkIds
    .map((chunkId) => chunks.find((chunk) => chunk.id === chunkId))
    .filter(Boolean) as ChunkOption[];
  const complete = selectedChunkIds.length === correctOrder.length;
  const correct = complete && selectedChunkIds.join('|') === correctOrder.join('|');

  return (
    <View style={styles.wrap}>
      <View style={[styles.answerArea, { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface }]}>
        {selectedChunks.length > 0 ? (
          <View style={styles.chunkRow}>
            {selectedChunks.map((chunk) => (
              <Pressable
                key={chunk.id}
                accessibilityRole="button"
                disabled={checked}
                onPress={() => onRemove(chunk.id)}
                style={({ pressed }) => [
                  styles.selectedChunk,
                  {
                    backgroundColor: appTheme.colors.surface,
                    borderColor: appTheme.colors.border,
                  },
                  pressed && !checked ? styles.pressed : null,
                ]}
              >
                <Text
                  style={[
                    styles.chunkText,
                    { color: checked && correct ? appTheme.colors.primary : appTheme.colors.text },
                  ]}
                >
                  {chunk.text}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <Text style={[styles.placeholder, { color: appTheme.colors.muted }]}>Tap chunks to build the sentence</Text>
        )}
      </View>

      <View style={styles.availableArea}>
        {chunks.map((chunk) => {
          const used = selectedSet.has(chunk.id);
          const rejected = rejectedSet.has(chunk.id);

          return (
            <Pressable
              key={chunk.id}
              accessibilityRole="button"
              disabled={checked || used || rejected}
              onPress={() => onAdd(chunk.id)}
              style={({ pressed }) => [
                styles.availableChunk,
                {
                  backgroundColor: rejected
                    ? appTheme.colors.border
                    : used
                      ? 'transparent'
                      : appTheme.colors.surface,
                  borderColor: used ? 'transparent' : appTheme.colors.border,
                  opacity: rejected ? 0.54 : 1,
                },
                pressed && !checked && !used && !rejected ? styles.pressed : null,
              ]}
            >
              <Text
                style={[
                  styles.chunkText,
                  { color: rejected ? appTheme.colors.muted : used ? 'transparent' : appTheme.colors.text },
                ]}
              >
                {chunk.text}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={!complete || checked}
        onPress={onCheck}
        style={({ pressed }) => [
          styles.checkButton,
          { backgroundColor: complete && !checked ? appTheme.colors.primary : appTheme.colors.border },
          pressed && complete && !checked ? styles.pressed : null,
        ]}
      >
        <Text
          style={[
            styles.checkText,
            { color: complete && !checked ? appTheme.colors.surface : appTheme.colors.muted },
          ]}
        >
          Check
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.md,
  },
  answerArea: {
    minHeight: 88,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  availableArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chunkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  selectedChunk: {
    minHeight: 42,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  availableChunk: {
    minHeight: 42,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  chunkText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  placeholder: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    textAlign: 'center',
  },
  checkButton: {
    minHeight: 50,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});
