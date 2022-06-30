import {Dimensions} from 'react-native';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');

export const formatPrice = (price: number, extendText?: string) => {
  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return extendText ? `${numberFormat.format(price)} ${extendText}` : numberFormat.format(price);
};
