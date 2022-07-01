import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fonts } from '../assets/fonts';
import { IDishDetail } from '../data/type';
import { formatPrice } from '../utils';

const DishDetail = ({ route, navigation }: any) => {
  const { name, image, price, description }: IDishDetail = route.params;

  // State
  const [amount, setAmount] = useState<number>(0);
  const [request, setRequest] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.bgHeaderContainer}>
        <Image source={image} style={styles.imageBG} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
        >
          <Image source={require('../assets/images/close.png')} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.dishNameWrapper}>
          <Text numberOfLines={2} style={styles.dishName}>{name}</Text>
          <View style={styles.saleOffWrapper}>
            <Image source={require('../assets/images/tag.png')} style={styles.saleOffIcon} />
            <Text>{formatPrice(15000, 'off')}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.dishPriceWrapper}>
          <Text style={styles.dishPrice}>{formatPrice(price)}</Text>
          <Text style={styles.saleOffPrice}>{formatPrice(price + 15000)}</Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.noteContainer}>
        <View style={styles.noteTitleWrapper}>
          <Text style={styles.noteTitle}>Note to restaurant</Text>
          <Text style={styles.noteOptionalText}>Optional</Text>
        </View>

        <View style={styles.noteRequireWrapper}>
          <TextInput
            placeholder="Add your request (subject to restaurant's discretion)"
            onChangeText={(text: string) => setRequest(text)}
            defaultValue={request}
          />
        </View>

        <View style={styles.amountWrapper}>
          <TouchableOpacity
            onPress={() => setAmount(prevAmount => prevAmount - 1)}
            style={styles.plusMinusBtn}
            disabled={amount <= 0}
          >
            <Image source={require('../assets/images/minus.png')} style={styles.plusMinusIcon} />
          </TouchableOpacity>
          <View style={styles.amountTextWrapper}>
            <Text style={styles.amountText}>{amount}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setAmount(prevAmount => prevAmount + 1)}
            style={styles.plusMinusBtn}
          >
            <Image source={require('../assets/images/plus.png')} style={styles.plusMinusIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <TouchableOpacity
          style={styles.totalBtn}
        >
          <Text style={styles.totalText}>Add to Basket - {formatPrice(amount * price)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgHeaderContainer: {
    flex: 1.5,
  },
  imageBG: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    left: 16,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  closeIcon: {
    width: 14,
    height: 14,
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  dishNameWrapper: {
    flex: 2,
  },
  dishName: {
    fontFamily: fonts.Roboto_Medium,
    fontSize: 18,
    lineHeight: 24,
    color: '#222222',
  },
  dishPriceWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  dishPrice: {
    fontFamily: fonts.Roboto_Medium,
    fontSize: 18,
    lineHeight: 24,
    color: '#222222',
    marginBottom: 15,
  },
  saleOffWrapper: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  saleOff: {
    fontFamily: fonts.Roboto_Regular,
    fontSize: 14,
  },
  saleOffIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  saleOffPrice: {
    fontFamily: fonts.Roboto_Regular,
    fontSize: 14,
    opacity: 0.6,
    color: '#222222',
    textDecorationLine: 'line-through',
  },
  description: {
    fontFamily: fonts.Roboto_Regular,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.6,
    color: '#222222',
  },
  line: {
    width: '100%',
    height: 6,
    backgroundColor: '#222222',
    opacity: 0.2
  },

  noteContainer: {
    flex: 2.5,
  },
  noteTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  noteTitle: {
    fontFamily: fonts.Roboto_Medium,
    fontSize: 14,
    color: '#222222',
    marginRight: 10,
  },
  noteOptionalText: {
    fontFamily: fonts.Roboto_Regular,
    fontSize: 12,
    opacity: 0.6,
    color: '#222222',
  },
  noteRequireWrapper: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'rgba(34, 34, 34, 0.2)',
  },
  noteRequire: {

  },
  amountWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },
  amountTextWrapper: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontFamily: fonts.Roboto_Medium,
    fontSize: 18,
    lineHeight: 24,
    color: '#222222',
  },
  plusMinusBtn: {
    padding: 15,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(34, 34, 34, 0.2)',
  },
  plusMinusIcon: {
    width: 15,
    height: 15,
  },

  totalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#222222',
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 0,
          height: -2,
        },
      },
    }),
  },

  totalBtn: {
    width: '90%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#02B14F',
    borderRadius: 4,
  },
  totalText: {
    fontFamily: fonts.Roboto_Medium,
    fontSize: 14,
    color: '#FFFFFF',
  },
})

export default DishDetail;