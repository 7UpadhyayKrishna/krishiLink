import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants/colors';

type CropHealthMapProps = {
  onSelectField: (fieldId: number | null) => void;
};

export default function CropHealthMap({ onSelectField }: CropHealthMapProps) {
  // In a real app, we would use a mapping library like react-native-maps
  // For this demo, we'll use a static image with overlays
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
        style={styles.mapImage}
        resizeMode="cover"
      />
      
      {/* Field Overlays */}
      <View
        style={[
          styles.fieldOverlay,
          { top: 60, left: 100, backgroundColor: colors.success + '40' }
        ]}
      />
      
      <View
        style={[
          styles.fieldOverlay,
          { top: 120, left: 180, backgroundColor: colors.warning + '40' }
        ]}
      />
      
      <View
        style={[
          styles.fieldOverlay,
          { top: 100, left: 30, backgroundColor: colors.error + '40' }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  fieldOverlay: {
    position: 'absolute',
    width: 80,
    height: 60,
    borderWidth: 2,
    borderColor: 'white',
  },
});