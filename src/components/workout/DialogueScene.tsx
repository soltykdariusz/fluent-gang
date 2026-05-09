import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme/theme';
import { CharacterDialogueLine } from '../../types/workout';
import { CharacterBubble } from './CharacterBubble';

type Props = {
  lines: CharacterDialogueLine[];
  visibleCount: number;
};

export function DialogueScene({ lines, visibleCount }: Props) {
  const visibleLines = lines.slice(0, visibleCount);

  return (
    <View style={styles.scene}>
      {visibleLines.map((line, index) => (
        <CharacterBubble key={`${line.characterId}-${index}`} line={line} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    gap: theme.spacing.sm,
  },
});
