import { Volume2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { playSentenceAudio } from '../../services/soundService';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';
import { CharacterDialogueLine } from '../../types/workout';
import { CharacterAvatarPlaceholder } from './CharacterAvatarPlaceholder';

type Props = {
  line: CharacterDialogueLine;
};

export function CharacterBubble({ line }: Props) {
  const appTheme = useTheme();
  const [visibleText, setVisibleText] = useState('');
  const text = line.text ?? '';

  useEffect(() => {
    setVisibleText('');
    void playSentenceAudio(text, '');

    let index = 0;
    const intervalId = setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 18);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <View style={styles.row}>
      <CharacterAvatarPlaceholder characterId={line.characterId} name={line.characterName} emotion={line.emotion} />
      <View style={[styles.bubble, { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border }]}>
        <View
          style={[
            styles.tail,
            { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border },
          ]}
        />
        <View style={styles.sentenceRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Play ${text}`}
            onPress={() => {
              void playSentenceAudio(text, '');
            }}
            style={({ pressed }) => [styles.audioButton, pressed ? styles.pressed : null]}
          >
            <Volume2 size={18} color={appTheme.colors.muted} strokeWidth={2.4} />
          </Pressable>
          <Text style={[styles.text, { color: appTheme.colors.text }]}>{visibleText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  bubble: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  tail: {
    position: 'absolute',
    left: -6,
    top: 21,
    width: 12,
    height: 12,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  sentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  audioButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.68,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    flexShrink: 1,
  },
});
