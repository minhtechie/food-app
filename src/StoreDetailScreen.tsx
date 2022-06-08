/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import AnimatedHeader from './components/AnimatedHeader';
import SearchModal from './components/SearchModal';
import ShopDetailRow from './components/ShopDetailRow';
import {menuData} from './data/menuData';
import {formatPrice} from './utils';

const HEADER_HEIGHT = 80;

export type CategoryPositions = number[];

export default () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const [activeCategory, setActiveCategory] = useState(-1);
  const [categoryPositions, setCategoryPositions] = useState<CategoryPositions>(
    [],
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollTo = (index: number) => {
    scrollViewRef?.current?.scrollTo({
      x: 0,
      y: categoryPositions[index] + HEADER_HEIGHT,
      animated: false,
    });
  };

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    categoryPositions.forEach((position, index) => {
      if (y >= position && y < categoryPositions[index + 1]) {
        setActiveCategory(index);
        return;
      } else if (y > categoryPositions[categoryPositions.length - 1]) {
        setActiveCategory(categoryPositions.length - 1);
      }
    });
  };

  const bannerAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-200, 0],
          outputRange: [2, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const headerAnimation = {
    zIndex: animatedValue,
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1, 40],
          outputRange: [0, 1, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const searchIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  const backIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <TouchableOpacity style={styles.backButton}>
        <Animated.Image
          source={require('./assets/images/chevron-left.png')}
          style={[styles.backIcon, backIconAnimation]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setSearchModalVisible(true)}>
        <Animated.Image
          source={require('./assets/images/search.png')}
          style={[styles.searchIcon, searchIconAnimation]}
        />
      </TouchableOpacity>
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />

      <AnimatedHeader
        categories={menuData}
        animationStyle={headerAnimation}
        activeCategory={activeCategory}
        onChangeCategory={(index: number) => {
          scrollTo(index);
          setActiveCategory(index);
        }}
      />

      <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
        <Image
          style={styles.banner}
          source={require('./assets/images/foodBanner.png')}
        />
        <LinearGradient
          style={styles.gradient}
          colors={['black', 'black', 'transparent']}
        />
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: animatedValue},
              },
            },
          ],
          {useNativeDriver: true, listener: event => handleScroll(event)},
        )}
        scrollEventThrottle={16}>
        <View style={styles.paddingForBanner} />

        <View style={styles.scrollViewContent}>
          <View style={styles.shopDetailsCard}>
            <ShopDetailRow>
              <Text style={styles.shopName}>Minh Techie</Text>
            </ShopDetailRow>

            <ShopDetailRow leftIcon={require('./assets/images/star.png')}>
              <Text style={styles.boldText}>4.5</Text>
              <Text style={styles.greyText}>(76)</Text>
              <View style={styles.dot} />
              <Text style={styles.regularText}>Ratings and reviews</Text>
            </ShopDetailRow>

            <ShopDetailRow leftIcon={require('./assets/images/distance.png')}>
              <View>
                <View style={[styles.row, {marginBottom: 8}]}>
                  <Text style={styles.boldText}>0.5 km</Text>
                  <Text style={styles.greyText}> (20 mins)</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.smallText}>Deliver now</Text>
                  <View style={styles.verticalBar} />
                  <Image
                    source={require('./assets/images/motorcycle.png')}
                    style={styles.bikeIcon}
                  />
                  <Text style={styles.smallText}>{formatPrice(16000)}</Text>
                </View>
              </View>
            </ShopDetailRow>

            <ShopDetailRow
              leftIcon={require('./assets/images/tag.png')}
              hideBorder>
              <Text style={styles.regularText}>Enjoy discount on items</Text>
            </ShopDetailRow>
          </View>

          {menuData.map(({name, id, items}) => (
            <Menu
              key={id}
              title={name}
              categoryPositions={categoryPositions}
              setCategoryPositions={setCategoryPositions}>
              {items.map(item => (
                <MenuItem {...item} key={item.id} />
              ))}
            </Menu>
          ))}
          <View style={{height: 16}} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const BANNER_HEIGHT = 224;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    top: 48,
    width: 48,
    height: 48,
    zIndex: 100,
  },
  searchIcon: {
    width: 32,
    height: 32,
    tintColor: 'white',
    zIndex: 50,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 49,
    width: 48,
    height: 48,
    zIndex: 100,
  },
  backIcon: {
    width: 36,
    height: 36,
    tintColor: 'white',
    zIndex: 50,
  },
  bannerContainer: {
    position: 'absolute',
    height: BANNER_HEIGHT,
    width: '100%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    opacity: 0.6,
    width: '100%',
    height: 124,
  },
  paddingForBanner: {
    height: BANNER_HEIGHT,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  shopDetailsCard: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -40,
    marginBottom: 32,
    borderRadius: 14,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#d3d3d3',
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  shopName: {
    color: '#101825',
    fontSize: 24,
    fontFamily: 'Roboto-Medium',
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#222222',
  },
  regularText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#222222',
  },
  greyText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#607d8b',
    marginLeft: 4,
  },
  smallText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#222222',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#222222',
    marginHorizontal: 8,
  },
  bikeIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  verticalBar: {
    height: '100%',
    width: 0.5,
    backgroundColor: '#222222',
    marginHorizontal: 5,
  },
});
