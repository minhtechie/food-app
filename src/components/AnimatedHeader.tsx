import React from 'react';
import {
  Image,
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchInput from './SearchInput';

export default ({
  categories,
  activeCategory,
  onChangeCategory,
  animationStyle,
}: {
  categories: Array<any>;
  activeCategory: number;
  onChangeCategory: (categoryId: number) => void;
  animationStyle: any;
}) => {
  return (
    <Animated.View style={[styles.container, animationStyle]}>
      <SafeAreaView />
      <View style={styles.upperRow}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/chevron-left.png')}
            style={[styles.backIcon]}
          />
        </TouchableOpacity>

        <SearchInput />

        <TouchableOpacity>
          <Image
            source={require('../assets/images/more.png')}
            style={[styles.moreIcon]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(({id, name}, index) => {
          return (
            <TouchableOpacity onPress={() => onChangeCategory(index)} key={id}>
              <Text
                style={[
                  styles.categoryname,
                  index === activeCategory ? styles.activeCategoryName : null,
                ]}>
                {name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    paddingTop: 16,
    backgroundColor: 'white',
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
  },
  backIcon: {
    width: 36,
    height: 36,
  },
  moreIcon: {
    height: 36,
    width: 36,
  },
  categoryname: {
    margin: 16,
    color: '#333',
    fontSize: 13,
  },
  activeCategoryName: {
    color: '#21B358',
    fontWeight: 'bold',
  },
});
