import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import PriceChart from '@/components/PriceChart';
import { crops } from '@/constants/crops';

export default function PricePredictionScreen() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedPeriod, setSelectedPeriod] = useState('15d');
  const [showCropDropdown, setShowCropDropdown] = useState(false);
  
  const predictedPrices = {
    current: '₹25/kg',
    min: '₹22/kg',
    max: '₹32/kg',
    trend: 'up',
    change: '+12%'
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Price Predictions</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Select Crop</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowCropDropdown(!showCropDropdown)}
            >
              <Text style={styles.dropdownText}>{selectedCrop}</Text>
              <Feather name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            {showCropDropdown && (
              <View style={styles.dropdown}>
                <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
                  {crops.map((crop) => (
                    <TouchableOpacity
                      key={crop}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedCrop(crop);
                        setShowCropDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{crop}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={16} color={colors.textSecondary} />
            <Text style={styles.locationText}>Nashik, Maharashtra</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.predictionSummary}>
          <View style={styles.predictionHeader}>
            <Text style={styles.predictionTitle}>{selectedCrop} Price Forecast</Text>
            <View style={styles.trendContainer}>
              <Feather 
                name={predictedPrices.trend === 'up' ? 'trending-up' : 'trending-down'} 
                size={16} 
                color={predictedPrices.trend === 'up' ? colors.success : colors.error}
              />
              <Text 
                style={[
                  styles.trendText, 
                  { color: predictedPrices.trend === 'up' ? colors.success : colors.error }
                ]}
              >
                {predictedPrices.change}
              </Text>
            </View>
          </View>
          
          <View style={styles.priceCards}>
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Current Price</Text>
              <Text style={styles.priceValue}>{predictedPrices.current}</Text>
            </View>
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Min. Expected</Text>
              <Text style={styles.priceValue}>{predictedPrices.min}</Text>
            </View>
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Max. Expected</Text>
              <Text style={styles.priceValue}>{predictedPrices.max}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <View style={styles.periodSelector}>
            <TouchableOpacity 
              style={[styles.periodButton, selectedPeriod === '7d' && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod('7d')}
            >
              <Text style={[styles.periodText, selectedPeriod === '7d' && styles.selectedPeriodText]}>7 days</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.periodButton, selectedPeriod === '15d' && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod('15d')}
            >
              <Text style={[styles.periodText, selectedPeriod === '15d' && styles.selectedPeriodText]}>15 days</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.periodButton, selectedPeriod === '30d' && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod('30d')}
            >
              <Text style={[styles.periodText, selectedPeriod === '30d' && styles.selectedPeriodText]}>30 days</Text>
            </TouchableOpacity>
          </View>
          
          <PriceChart cropName={selectedCrop} period={selectedPeriod} />
          
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendText}>Historical Price</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.legendText}>Predicted Price</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Feather name="info" size={20} color={colors.primary} />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Market Insight</Text>
            <Text style={styles.insightText}>
              Based on historical trends and market demand, {selectedCrop} prices are expected to 
              {predictedPrices.trend === 'up' ? ' increase' : ' decrease'} over the next {selectedPeriod === '7d' ? '7' : selectedPeriod === '15d' ? '15' : '30'} days. 
              Consider {predictedPrices.trend === 'up' ? 'waiting before selling' : 'selling soon'} for optimal returns.
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="list" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Create New Listing</Text>
        </TouchableOpacity>
        
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
  header: {
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    backgroundColor: colors.white,
  },
  inputContainer: {
    marginBottom: 12,
    position: 'relative',
    zIndex: 1000,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.textPrimary,
  },
  dropdown: {
    position: 'absolute',
    top: 74,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.textPrimary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  changeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary,
  },
  predictionSummary: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  predictionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  priceCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  priceLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  chartContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  selectedPeriod: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectedPeriodText: {
    color: colors.white,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  insightCard: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    flexDirection: 'row',
  },
  insightIconContainer: {
    marginRight: 16,
    paddingTop: 2,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  insightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 40,
  },
});