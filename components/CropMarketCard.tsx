import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

type CropMarketCardProps = {
  listing: {
    id: string;
    cropName: string;
    farmerName: string;
    location: string;
    quantity: string;
    price: string;
    imageUrl: string;
    rating: number;
  };
};

export default function CropMarketCard({ listing }: CropMarketCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: listing.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.cropName}>{listing.cropName}</Text>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color={colors.accent} />
            <Text style={styles.rating}>{listing.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.farmerName}>{listing.farmerName}</Text>
        
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={14} color={colors.textSecondary} />
          <Text style={styles.location}>{listing.location}</Text>
        </View>
        
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>{listing.quantity}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={[styles.detailValue, styles.priceValue]}>{listing.price}</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.callButton}>
            <Feather name="phone" size={16} color={colors.primary} />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Feather name="message-circle" size={16} color={colors.white} />
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cropName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.textPrimary,
    marginLeft: 4,
  },
  farmerName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
  },
  priceValue: {
    color: colors.primary,
    fontFamily: 'Poppins-Bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
  },
  callButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
  },
  chatButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.white,
    marginLeft: 8,
  },
});