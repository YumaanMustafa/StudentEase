import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Header = ({ title, onLogout }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {onLogout && (
        <Button title="Logout" onPress={onLogout} color="red" />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
