import React from 'react';
import {StyleSheet, TextInputProps, TextInput, View, Image} from 'react-native';

export default (props: TextInputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search in Minh Techie Restaurant..."
        placeholderTextColor="#909090"
        {...props}
      />
      <Image
        source={require('../assets/images/search.png')}
        style={styles.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    padding: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
  },
  input: {
    flex: 1,
    color: '#333',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
})