import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Student Portal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#005EB8',
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Footer;
