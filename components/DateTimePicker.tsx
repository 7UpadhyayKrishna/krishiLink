import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type DateTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
};

export default function DateTimePicker({ value, onChange, mode = 'date' }: DateTimePickerProps) {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getDisplayText = () => {
    if (mode === 'date') return formatDate(value);
    if (mode === 'time') return formatTime(value);
    return `${formatDate(value)} ${formatTime(value)}`;
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{getDisplayText()}</Text>
      <Feather name="calendar" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textPrimary,
  },
});