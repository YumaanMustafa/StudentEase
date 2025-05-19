// src/components/Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Reusable footer component
 */
const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2025 SimpleShop</Text>
  </View>
);
//styling for footer
const styles = StyleSheet.create({
  footer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

export default Footer;
