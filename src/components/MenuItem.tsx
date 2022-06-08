import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import {formatPrice} from '../utils';

type MenuItemProps = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: number;
  description: string;
  style?: ViewStyle;
};
export default ({name, image, price, description, style}: MenuItemProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={image} style={styles.image} />
      <View style={styles.dishInfo}>
        <View>
          <Text style={styles.dishName}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eaeaea',
    paddingVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  dishInfo: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 14,
    color: '#222222',
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    lineHeight: 16,
  },
  description: {
    fontSize: 12,
    color: '#222222',
    marginBottom: 8,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
  },
  price: {
    fontSize: 16,
    color: '#222222',
    fontFamily: 'Roboto-Medium',
  },
});
