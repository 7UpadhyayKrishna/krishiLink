import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

export default function WeatherCard() {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={16} color={colors.textSecondary} />
          <Text style={styles.location}>Nashik, Maharashtra</Text>
        </View>
        <Text style={styles.date}>Today, Jun 15</Text>
      </View>
      
      <View style={styles.weatherContent}>
        <View style={styles.currentWeather}>
          <Feather name="sun" size={48} color={colors.accent} />
          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>32°</Text>
            <Text style={styles.weatherCondition}>Sunny</Text>
          </View>
        </View>
        
        <View style={styles.weatherDetails}>
          <View style={styles.weatherDetail}>
            <Feather name="droplet" size={16} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>65%</Text>
          </View>
          
          <View style={styles.weatherDetail}>
            <Feather name="wind" size={16} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>12 km/h</Text>
          </View>
          
          <View style={styles.weatherDetail}>
            <Feather name="cloud-rain" size={16} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Rain</Text>
            <Text style={styles.detailValue}>0%</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.forecast}>
        <View style={styles.forecastDay}>
          <Text style={styles.forecastDate}>Jun 16</Text>
          <Feather name="sun" size={20} color={colors.accent} />
          <Text style={styles.forecastTemp}>33°</Text>
        </View>
        
        <View style={styles.forecastDay}>
          <Text style={styles.forecastDate}>Jun 17</Text>
          <Feather name="cloud" size={20} color={colors.textSecondary} />
          <Text style={styles.forecastTemp}>30°</Text>
        </View>
        
        <View style={styles.forecastDay}>
          <Text style={styles.forecastDate}>Jun 18</Text>
          <Feather name="cloud-rain" size={20} color={colors.info} />
          <Text style={styles.forecastTemp}>28°</Text>
        </View>
        
        <View style={styles.forecastDay}>
          <Text style={styles.forecastDate}>Jun 19</Text>
          <Feather name="cloud-rain" size={20} color={colors.info} />
          <Text style={styles.forecastTemp}>27°</Text>
        </View>
        
        <View style={styles.forecastDay}>
          <Text style={styles.forecastDate}>Jun 20</Text>
          <Feather name="sun" size={20} color={colors.accent} />
          <Text style={styles.forecastTemp}>31°</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempContainer: {
    marginLeft: 16,
  },
  temperature: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: colors.textPrimary,
  },
  weatherCondition: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  weatherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherDetail: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 4,
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastDay: {
    alignItems: 'center',
  },
  forecastDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  forecastTemp: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 4,
  },
});