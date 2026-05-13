import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme/theme';
import { CharacterDialogueLine } from '../../types/workout';
import { CharacterBubble } from './CharacterBubble';

type Props = {
  lines: CharacterDialogueLine[];
  visibleCount: number;
  highlightTerms?: string[];
  autoPlayLatestOnly?: boolean;
  onLineAudioStart?: () => void;
  onLineAudioEnd?: () => void;
};

export function DialogueScene({
  lines,
  visibleCount,
  highlightTerms = [],
  autoPlayLatestOnly = false,
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
          autoPlay={!autoPlayLatestOnly || index === visibleLines.length - 1}
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
