import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme/theme';
import { CharacterDialogueLine } from '../../types/workout';
import { CharacterBubble } from './CharacterBubble';

type Props = {
  lines: CharacterDialogueLine[];
  visibleCount: number;
  highlightTerms?: string[];
  onLineAudioStart?: () => void;
  onLineAudioEnd?: () => void;
};

export function DialogueScene({
  lines,
  visibleCount,
  highlightTerms = [],
  onLineAudioStart,
  onLineAudioEnd,
}: Props) {
  const visibleLines = lines.slice(0, visibleCount);

  return (
    <View style={styles.scene}>
      {visibleLines.map((line, index) => (
        <CharacterBubble
          key={`${line.characterId}-${index}`}
          line={line}
          highlightTerms={highlightTerms}
          onAudioStart={index === visibleLines.length - 1 ? onLineAudioStart : undefined}
          onAudioEnd={index === visibleLines.length - 1 ? onLineAudioEnd : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    gap: theme.spacing.sm,
  },
});
