import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width >= 768;

type CropListingCardProps = {
  cropName: string;
  quantity: string;
  askingPrice: string;
  imageUrl: string;
  onPress?: () => void;
};

export default function CropListingCard({
  cropName,
  quantity,
  askingPrice,
  imageUrl,
  onPress
}: CropListingCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, isDesktop && styles.desktopContainer]} 
      onPress={onPress}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.cropName}>{cropName}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{askingPrice}</Text>
          <Feather name="edit-2" size={14} color={colors.primary} />
        </View>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Active</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 4,
  },
  desktopContainer: {
    flex: 1,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  cropName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
  },
  quantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.success + 'CC',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: colors.white,
  },
});