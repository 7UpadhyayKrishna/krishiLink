import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  const languages = ['English', 'हिन्दी', 'मराठी', 'ગુજરાતી', 'ਪੰਜਾਬੀ'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Rajesh Patel</Text>
            <Text style={styles.location}>Nashik, Maharashtra</Text>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={16} color={colors.accent} />
              <Text style={styles.rating}>4.8</Text>
              <Text style={styles.ratingCount}>(32 ratings)</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Crops Listed</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sales</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.5 ha</Text>
            <Text style={styles.statLabel}>Land Area</Text>
          </View>
        </View>
        
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Account Settings</Text>
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Feather name="phone" size={20} color={colors.textPrimary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Phone Number</Text>
          </View>
          <Text style={styles.settingValue}>+91 98765 43210</Text>
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Feather name="globe" size={20} color={colors.textPrimary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Language</Text>
          </View>
          <TouchableOpacity style={styles.pickerContainer}>
            <Text style={styles.pickerValue}>{language}</Text>
            <Feather name="chevron-down" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Feather name="bell" size={20} color={colors.textPrimary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: colors.border, true: colors.primary + '80' }}
            thumbColor={notifications ? colors.primary : colors.lightGray}
            onValueChange={setNotifications}
            value={notifications}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Feather name="message-circle" size={20} color={colors.textPrimary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>WhatsApp Alerts</Text>
          </View>
          <Switch
            trackColor={{ false: colors.border, true: colors.primary + '80' }}
            thumbColor={whatsappAlerts ? colors.primary : colors.lightGray}
            onValueChange={setWhatsappAlerts}
            value={whatsappAlerts}
          />
        </View>
        
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Support</Text>
        </View>
        
        <TouchableOpacity style={styles.supportItem}>
          <Feather name="help-circle" size={20} color={colors.textPrimary} style={styles.supportIcon} />
          <Text style={styles.supportText}>Help & FAQs</Text>
          <Feather name="chevron-right" size={18} color={colors.textSecondary} style={styles.supportArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.supportItem}>
          <Feather name="message-square" size={20} color={colors.textPrimary} style={styles.supportIcon} />
          <Text style={styles.supportText}>Contact Support</Text>
          <Feather name="chevron-right" size={18} color={colors.textSecondary} style={styles.supportArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.supportItem}>
          <Feather name="info" size={20} color={colors.textPrimary} style={styles.supportIcon} />
          <Text style={styles.supportText}>About KrishiLink</Text>
          <Feather name="chevron-right" size={18} color={colors.textSecondary} style={styles.supportArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.textPrimary,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 4,
    marginRight: 4,
  },
  ratingCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.primary,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    height: '80%',
    alignSelf: 'center',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
  },
  settingValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  supportIcon: {
    marginRight: 12,
  },
  supportText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
  supportArrow: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.error + '10',
    borderRadius: 8,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.error,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
});