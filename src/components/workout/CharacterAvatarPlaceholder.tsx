import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import chameleonAvatar from '../../../assets/mascots/chameleon-avatar.png';
import rayAvatar from '../../../assets/mascots/ray-avatar.png';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';
import { CharacterEmotion } from '../../types/workout';

type Props = {
  characterId: string;
  name: string;
  emotion: CharacterEmotion;
};

const emotionSymbol: Record<CharacterEmotion, string> = {
  idle: ':)',
  talking: ':D',
  thinking: '...',
  confident: '^_^',
  confused: '?',
  happy: ':)',
  surprised: '!',
  arguing: '!!',
  celebrating: '*',
};

const avatarByCharacter: Record<string, ImageSourcePropType> = {
  ray: rayAvatar,
  zac: rayAvatar,
  mia: chameleonAvatar,
  polly: chameleonAvatar,
};

export function CharacterAvatarPlaceholder({ characterId, name, emotion }: Props) {
  const appTheme = useTheme();
  const initial = name.charAt(0).toUpperCase();
  const avatar = avatarByCharacter[characterId];

  return (
    <View style={[styles.avatar, { backgroundColor: appTheme.colors.primarySoft }]}>
      {avatar ? (
        <Image source={avatar} style={styles.avatarImage} resizeMode="cover" />
      ) : (
        <Text style={[styles.initial, { color: appTheme.colors.primary }]}>{initial}</Text>
      )}
      <Text style={[styles.emotion, { color: appTheme.colors.muted }]}>{emotionSymbol[emotion]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '118%',
    height: '118%',
  },
  initial: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '900',
  },
  emotion: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 9,
    lineHeight: 18,
    fontWeight: '900',
  },
});
