import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>🎓 Student Portal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#005EB8',
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;
