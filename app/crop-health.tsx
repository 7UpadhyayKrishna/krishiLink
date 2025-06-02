import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import CropHealthMap from '@/components/CropHealthMap';

export default function CropHealthScreen() {
  const [selectedField, setSelectedField] = useState(null);
  const [selectedTab, setSelectedTab] = useState('health');
  
  const fields = [
    { id: 1, name: 'North Field', crop: 'Tomato', health: 'good', area: '2.5 acres' },
    { id: 2, name: 'South Field', crop: 'Onion', health: 'attention', area: '1.8 acres' },
    { id: 3, name: 'East Field', crop: 'Potato', health: 'poor', area: '1.2 acres' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Health Monitor</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.mapContainer}>
        <CropHealthMap onSelectField={setSelectedField} />
        
        <View style={styles.mapOverlay}>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
              <Text style={styles.legendText}>Healthy</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
              <Text style={styles.legendText}>Needs Attention</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
              <Text style={styles.legendText}>Poor Health</Text>
            </View>
          </View>
          
          <View style={styles.layerSelector}>
            <TouchableOpacity 
              style={[styles.layerButton, selectedTab === 'health' && styles.activeLayerButton]}
              onPress={() => setSelectedTab('health')}
            >
              <Text style={[styles.layerButtonText, selectedTab === 'health' && styles.activeLayerText]}>Health</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.layerButton, selectedTab === 'moisture' && styles.activeLayerButton]}
              onPress={() => setSelectedTab('moisture')}
            >
              <Text style={[styles.layerButtonText, selectedTab === 'moisture' && styles.activeLayerText]}>Moisture</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.layerButton, selectedTab === 'ndvi' && styles.activeLayerButton]}
              onPress={() => setSelectedTab('ndvi')}
            >
              <Text style={[styles.layerButtonText, selectedTab === 'ndvi' && styles.activeLayerText]}>NDVI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.fieldsContainer}>
        <Text style={styles.sectionTitle}>Your Fields</Text>
        
        {fields.map((field) => (
          <TouchableOpacity 
            key={field.id} 
            style={styles.fieldCard}
            onPress={() => setSelectedField(field.id)}
          >
            <View style={[styles.healthIndicator, 
              field.health === 'good' ? styles.healthGood : 
              field.health === 'attention' ? styles.healthAttention : 
              styles.healthPoor
            ]} />
            
            <View style={styles.fieldInfo}>
              <Text style={styles.fieldName}>{field.name}</Text>
              <Text style={styles.fieldDetails}>{field.crop} • {field.area}</Text>
            </View>
            
            <View style={styles.fieldActions}>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Details</Text>
                <Feather name="chevron-right" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.addFieldButton}>
          <Feather name="plus" size={20} color={colors.white} />
          <Text style={styles.addFieldText}>Add New Field</Text>
        </TouchableOpacity>
        
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Feather name="droplet" size={20} color={colors.info} />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Irrigation Alert</Text>
            <Text style={styles.insightText}>
              South Field moisture levels have dropped below optimal levels. Consider irrigating within the next 24 hours.
            </Text>
          </View>
        </View>
        
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Feather name="cloud-rain" size={20} color={colors.info} />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Weather Alert</Text>
            <Text style={styles.insightText}>
              Heavy rainfall expected in your region in 3 days. Plan your field activities accordingly.
            </Text>
          </View>
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
  mapContainer: {
    height: 240,
    position: 'relative',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textPrimary,
  },
  layerSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  layerButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeLayerButton: {
    backgroundColor: colors.primary,
  },
  layerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  activeLayerText: {
    color: colors.white,
  },
  fieldsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  fieldCard: {
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
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  healthGood: {
    backgroundColor: colors.success,
  },
  healthAttention: {
    backgroundColor: colors.warning,
  },
  healthPoor: {
    backgroundColor: colors.error,
  },
  fieldInfo: {
    flex: 1,
  },
  fieldName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
  },
  fieldDetails: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  fieldActions: {
    flexDirection: 'row',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  detailsButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  addFieldButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  addFieldText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
  },
  insightCard: {
    backgroundColor: colors.info + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
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
    color: colors.info,
    marginBottom: 4,
  },
  insightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});