import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CategoryPositions} from '../StoreDetailScreen';

export default ({
  title,
  children,
  categoryPositions,
  setCategoryPositions,
}: {
  title: string;
  categoryPositions: CategoryPositions;
  setCategoryPositions: (positions: number[]) => void;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={styles.container}
      onLayout={event => {
        const {y} = event.nativeEvent.layout;
        setCategoryPositions(
          [...categoryPositions, y].sort(function (a, b) {
            return a - b;
          }),
        );
      }}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#222222',
  },
});
