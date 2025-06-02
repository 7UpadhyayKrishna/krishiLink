import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

const mandiPrices = [
  { id: 1, name: 'Tomato', price: '₹25/kg', change: '+5%', trend: 'up' },
  { id: 2, name: 'Onion', price: '₹32/kg', change: '+12%', trend: 'up' },
  { id: 3, name: 'Potato', price: '₹18/kg', change: '-3%', trend: 'down' },
  { id: 4, name: 'Rice', price: '₹42/kg', change: '+2%', trend: 'up' },
  { id: 5, name: 'Wheat', price: '₹28/kg', change: '0%', trend: 'neutral' },
];

export default function LiveMandiPrice() {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {mandiPrices.map((item) => (
        <View key={item.id} style={styles.priceCard}>
          <Text style={styles.cropName}>{item.name}</Text>
          <Text style={styles.priceValue}>{item.price}</Text>
          <View style={styles.priceChange}>
            <Feather 
              name={
                item.trend === 'up' 
                  ? 'trending-up' 
                  : item.trend === 'down' 
                  ? 'trending-down' 
                  : 'minus'
              } 
              size={14} 
              color={
                item.trend === 'up' 
                  ? colors.success 
                  : item.trend === 'down' 
                  ? colors.error 
                  : colors.textSecondary
              } 
            />
            <Text 
              style={[
                styles.changeText,
                item.trend === 'up' 
                  ? styles.increaseText 
                  : item.trend === 'down' 
                  ? styles.decreaseText 
                  : styles.neutralText
              ]}
            >
              {item.change}
            </Text>
          </View>
          <Text style={styles.location}>Nashik Mandi</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    paddingVertical: 8,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  priceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cropName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  priceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  increaseText: {
    color: colors.success,
  },
  decreaseText: {
    color: colors.error,
  },
  neutralText: {
    color: colors.textSecondary,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
});