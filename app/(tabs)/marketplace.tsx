import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import { colors } from '@/constants/colors';
import MarketplaceFilters from '@/components/MarketplaceFilters';
import CropMarketCard from '@/components/CropMarketCard';

const cropListings = [
  {
    id: '1',
    cropName: 'Tomato',
    farmerName: 'Rajesh Patel',
    location: 'Nashik, 15km',
    quantity: '500 kg',
    price: '₹25/kg',
    imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
  },
  {
    id: '2',
    cropName: 'Onion',
    farmerName: 'Suresh Kumar',
    location: 'Lasalgaon, 8km',
    quantity: '1 ton',
    price: '₹32/kg',
    imageUrl: 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
  },
  {
    id: '3',
    cropName: 'Potato',
    farmerName: 'Amit Singh',
    location: 'Pune, 20km',
    quantity: '750 kg',
    price: '₹18/kg',
    imageUrl: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.3,
  },
  {
    id: '4',
    cropName: 'Rice',
    farmerName: 'Lakshmi Devi',
    location: 'Kolhapur, 12km',
    quantity: '2 tons',
    price: '₹42/kg',
    imageUrl: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
  },
];

export default function MarketplaceScreen() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <View style={styles.container}>
      <Header title="Marketplace" showSearch={true} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All Crops</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'vegetables' && styles.activeTab]} 
          onPress={() => setActiveTab('vegetables')}
        >
          <Text style={[styles.tabText, activeTab === 'vegetables' && styles.activeTabText]}>Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'fruits' && styles.activeTab]} 
          onPress={() => setActiveTab('fruits')}
        >
          <Text style={[styles.tabText, activeTab === 'fruits' && styles.activeTabText]}>Fruits</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'grains' && styles.activeTab]} 
          onPress={() => setActiveTab('grains')}
        >
          <Text style={[styles.tabText, activeTab === 'grains' && styles.activeTabText]}>Grains</Text>
        </TouchableOpacity>
      </View>
      
      <MarketplaceFilters />
      
      <ScrollView style={styles.listingsContainer} showsVerticalScrollIndicator={false}>
        {cropListings.map((crop) => (
          <CropMarketCard key={crop.id} listing={crop} />
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: colors.primary + '20',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  listingsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomPadding: {
    height: 100,
  },
});