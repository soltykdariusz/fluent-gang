import { BarChart3, Clock, LogOut, MessageSquare, Settings, User, CircleHelp } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { navigateAuth, navigateFocus, navigateProgress, navigateSettings } from '../navigation/rootNavigation';
import { lessonRoutes, onboardingRoutes } from '../navigation/routeGroups';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type FloatingMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function FloatingMenu({ open, onClose }: FloatingMenuProps) {
  const appTheme = useTheme();
  const currentRouteName = useAppStore((state) => state.currentRouteName) as keyof RootStackParamList | undefined;
  const setAuthenticated = useAppStore((state) => state.setAuthenticated);

  if (!open || !currentRouteName || onboardingRoutes.includes(currentRouteName) || lessonRoutes.includes(currentRouteName)) {
    return null;
  }

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={[styles.menu, { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface }]}>
        <MenuItem label="Profile" icon={<User size={16} color={appTheme.colors.primary} />} onPress={onClose} />
        <MenuItem
          label="Settings"
          icon={<Settings size={16} color={appTheme.colors.primary} />}
          onPress={() => {
            onClose();
            navigateSettings();
          }}
        />
        <MenuItem label="Help" icon={<CircleHelp size={16} color={appTheme.colors.primary} />} onPress={onClose} />
        <MenuItem label="Feedback" icon={<MessageSquare size={16} color={appTheme.colors.primary} />} onPress={onClose} />
        <MenuItem
          label="Progress"
          icon={<BarChart3 size={16} color={appTheme.colors.primary} />}
          onPress={() => {
            onClose();
            navigateProgress();
          }}
        />
        <MenuItem
          label="Focus settings"
          icon={<Clock size={16} color={appTheme.colors.primary} />}
          onPress={() => {
            onClose();
            navigateFocus();
          }}
        />
        <MenuItem
          label="Sign out"
          icon={<LogOut size={16} color={appTheme.colors.primary} />}
          onPress={() => {
            onClose();
            setAuthenticated(false);
            navigateAuth();
          }}
        />
      </View>
    </View>
  );
}

function MenuItem({ label, icon, onPress }: { label: string; icon: ReactNode; onPress?: () => void }) {
  const appTheme = useTheme();
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.item}>
      {icon}
      <Text style={[styles.itemText, { color: appTheme.colors.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: 86,
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
  },
  menu: {
    width: 162,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.xs,
    gap: 2,
  },
  item: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
