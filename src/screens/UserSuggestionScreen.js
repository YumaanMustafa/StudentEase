import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = 'http://192.168.100.20:3000/contact';

const UserSuggestion = () => {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load suggestions.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchContacts);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        Alert.alert('Deleted', 'Message deleted successfully.');
        fetchContacts();
      } else {
        Alert.alert('Error', 'Failed to delete message.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Network error.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.message}</Text>
      <View style={styles.buttonRow}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('Contact', { contact: item })}
        />
        <Button
          title="Delete"
          color="red"
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Logout button */}
        <Header title="Recent Suggestions" onLogout={handleLogout} />

      {contacts.length === 0 ? (
        <Text style={styles.empty}>No messages found.</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f7' },
  empty: { textAlign: 'center', marginTop: 20 },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  name: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default UserSuggestion;
