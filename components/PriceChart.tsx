import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { LineChart } from './LineChart';

type PriceChartProps = {
  cropName: string;
  period?: string;
};

export default function PriceChart({ cropName, period = '15d' }: PriceChartProps) {
  // Mock data generation based on cropName and period
  const generateData = () => {
    let days = period === '7d' ? 7 : period === '15d' ? 15 : 30;
    
    // Generate past data (historical)
    const pastData = Array.from({ length: Math.floor(days / 2) }, (_, i) => {
      const base = cropName === 'Tomato' ? 25 : 
                  cropName === 'Onion' ? 32 : 
                  cropName === 'Potato' ? 18 : 30;
      return base + Math.floor(Math.random() * 6) - 3;
    });
    
    // Generate future data (prediction)
    const futureData = Array.from({ length: Math.ceil(days / 2) }, (_, i) => {
      const lastValue = pastData[pastData.length - 1];
      // Add an upward trend for predictions
      return lastValue + (i * 0.5) + Math.floor(Math.random() * 4) - 1;
    });
    
    return {
      historical: pastData,
      predicted: futureData,
      labels: Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(days / 2) + i);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      })
    };
  };

  const chartData = generateData();
  
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [
            {
              data: [...chartData.historical, ...Array(chartData.predicted.length).fill(null)],
              color: colors.primary,
              strokeWidth: 2,
            },
            {
              data: [...Array(chartData.historical.length).fill(null), ...chartData.predicted],
              color: colors.accent,
              strokeWidth: 2,
              dashGap: 4,
            },
          ],
        }}
        width={Dimensions.get('window').width - 64}
        height={180}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 0,
          color: () => colors.primary,
          labelColor: () => colors.textSecondary,
          propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: colors.border,
            strokeWidth: 1,
          },
          propsForLabels: {
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    borderRadius: 8,
    paddingRight: 24,
  },
});