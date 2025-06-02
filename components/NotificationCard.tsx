import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

type NotificationCardProps = {
  title: string;
  message: string;
  time: string;
  type: 'buyer' | 'price' | 'weather' | 'system';
};

export default function NotificationCard({ title, message, time, type }: NotificationCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'buyer':
        return <Feather name="user" size={20} color={colors.primary} />;
      case 'price':
        return <Feather name="trending-up" size={20} color={colors.success} />;
      case 'weather':
        return <Feather name="cloud" size={20} color={colors.warning} />;
      case 'system':
        return <Feather name="info" size={20} color={colors.info} />;
      default:
        return <Feather name="bell" size={20} color={colors.textSecondary} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    opacity: 0.7,
  },
});