import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import { colors } from '@/constants/colors';
import PriceChart from '@/components/PriceChart';
import WeatherCard from '@/components/WeatherCard';
import InsightCard from '@/components/InsightCard';
import { Feather } from '@expo/vector-icons';

export default function InsightsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Insights" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <WeatherCard />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Price Trends</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/price-prediction')}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Feather name="chevron-right" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tomato Prices (Last 7 days)</Text>
          <PriceChart cropName="Tomato" />
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendText}>Market Price</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.legendText}>Your Price</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Insights & Tips</Text>
        </View>
        
        <InsightCard
          title="Best time to sell Tomatoes"
          description="Based on historical data, prices for tomatoes are expected to rise in the next 2 weeks. Consider holding your stock."
          icon="trending-up"
          color={colors.success}
        />
        
        <InsightCard
          title="Weather Alert for Onion Crops"
          description="Heavy rainfall expected in your region next week. Take necessary precautions for your onion fields."
          icon="cloud-rain"
          color={colors.warning}
        />
        
        <InsightCard
          title="New Government Scheme"
          description="PM-Kisan registration is now open. Get ₹6,000 annual support for your farming needs."
          icon="award"
          color={colors.info}
        />
        
        <TouchableOpacity 
          style={styles.cropHealthButton}
          onPress={() => router.push('/crop-health')}
        >
          <View style={styles.cropHealthContent}>
            <Feather name="map" size={24} color={colors.white} />
            <View style={styles.cropHealthTextContainer}>
              <Text style={styles.cropHealthTitle}>Satellite Crop Health</Text>
              <Text style={styles.cropHealthSubtitle}>Monitor your fields</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={24} color={colors.white} />
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  chartTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  legendContainer: {
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
  cropHealthButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  cropHealthContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropHealthTextContainer: {
    marginLeft: 16,
  },
  cropHealthTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.white,
  },
  cropHealthSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.white + 'DD',
  },
  bottomPadding: {
    height: 100,
  },
});