import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width >= 768;

type HeaderProps = {
  title: string;
  showNotification?: boolean;
  showSearch?: boolean;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
};

export default function Header({
  title,
  showNotification = false,
  showSearch = false,
  onNotificationPress,
  onSearchPress,
}: HeaderProps) {
  return (
    <View style={[styles.header, isDesktop && styles.desktopHeader]}>
      <View style={[styles.headerContent, isDesktop && styles.desktopHeaderContent]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          {showSearch && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onSearchPress}
            >
              <Feather name="search" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
          {showNotification && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onNotificationPress}
            >
              <Feather name="bell" size={24} color={colors.textPrimary} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'web' ? 16 : 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  desktopHeader: {
    paddingTop: 16,
  },
  headerContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  desktopHeaderContent: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
});