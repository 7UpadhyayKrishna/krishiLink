import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import LiveMandiPrice from '@/components/LiveMandiPrice';
import NotificationCard from '@/components/NotificationCard';
import { colors } from '@/constants/colors';
import CropListingCard from '@/components/CropListingCard';
import { Feather } from '@expo/vector-icons';

const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width >= 768;

export default function FarmerDashboard() {
  const navigateToPrediction = () => {
    router.push('/price-prediction');
  };
  
  const navigateToCropHealth = () => {
    router.push('/crop-health');
  };

  return (
    <View style={styles.container}>
      <Header title="KrishiLink" showNotification={true} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, isDesktop && styles.desktopContent]}>
          <View style={[styles.mainColumn, isDesktop && styles.desktopMainColumn]}>
            <View style={styles.welcome}>
              <Text style={styles.welcomeText}>Welcome, Rajesh</Text>
              <Text style={styles.subText}>Nashik, Maharashtra</Text>
            </View>

            <View style={styles.bannerContainer}>
              <Image
                source={{ uri: "https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerText}>Get the best prices for your crops</Text>
                <TouchableOpacity style={styles.bannerButton} onPress={() => router.push('/crop-listing')}>
                  <Text style={styles.bannerButtonText}>List New Crop</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Your Active Listings</Text>
            <View style={styles.cropListingsGrid}>
              <CropListingCard
                cropName="Tomato"
                quantity="500 kg"
                askingPrice="₹25/kg"
                imageUrl="https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <CropListingCard
                cropName="Onion"
                quantity="1 ton"
                askingPrice="₹32/kg"
                imageUrl="https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </View>

            <Text style={styles.sectionTitle}>Live Mandi Prices</Text>
            <LiveMandiPrice />

            <View style={styles.quickAccessContainer}>
              <TouchableOpacity style={styles.quickAccessCard} onPress={navigateToPrediction}>
                <View style={[styles.iconContainer, { backgroundColor: colors.accent + '20' }]}>
                  <Feather name="trending-up" size={24} color={colors.accent} />
                </View>
                <Text style={styles.quickAccessTitle}>Price Prediction</Text>
                <Text style={styles.quickAccessSubtitle}>View forecasts for your crops</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAccessCard} onPress={navigateToCropHealth}>
                <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
                  <Feather name="map" size={24} color={colors.success} />
                </View>
                <Text style={styles.quickAccessTitle}>Crop Health</Text>
                <Text style={styles.quickAccessSubtitle}>Monitor your fields</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isDesktop && (
            <View style={styles.sideColumn}>
              <Text style={styles.sectionTitle}>Recent Notifications</Text>
              <NotificationCard
                title="New Buyer Interested"
                message="Ganga Traders is interested in your Tomato listing"
                time="2 hours ago"
                type="buyer"
              />
              <NotificationCard
                title="Price Alert"
                message="Onion prices increased by 15% in your area"
                time="5 hours ago"
                type="price"
              />
            </View>
          )}

          {!isDesktop && (
            <>
              <Text style={styles.sectionTitle}>Recent Notifications</Text>
              <NotificationCard
                title="New Buyer Interested"
                message="Ganga Traders is interested in your Tomato listing"
                time="2 hours ago"
                type="buyer"
              />
              <NotificationCard
                title="Price Alert"
                message="Onion prices increased by 15% in your area"
                time="5 hours ago"
                type="price"
              />
            </>
          )}
        </View>
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
  },
  content: {
    padding: 16,
  },
  desktopContent: {
    flexDirection: 'row',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    gap: 24,
  },
  mainColumn: {
    flex: 1,
  },
  desktopMainColumn: {
    flex: 0.7,
  },
  sideColumn: {
    flex: 0.3,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    height: 'fit-content',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: 16,
  },
  welcome: {
    marginBottom: 16,
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: colors.textPrimary,
  },
  subText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: -2,
  },
  bannerContainer: {
    marginBottom: 24,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  bannerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
  },
  bannerButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.white,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  cropListingsGrid: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: 16,
    marginBottom: 24,
  },
  quickAccessContainer: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  quickAccessSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomPadding: {
    height: 100,
  },
});