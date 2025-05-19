import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';

const API_URL = 'http://192.168.100.20:3000/contact';

const ContactScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editingContact = route.params?.contact || null;

  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    message: '',
  });

  const isEditing = editingContact !== null;

  useEffect(() => {
    if (editingContact) {
      setForm(editingContact);
    }
  }, [editingContact]);

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      return Alert.alert('Validation Error', 'All fields are required.');
    }

    if (!isValidEmail(form.email)) {
      return Alert.alert('Validation Error', 'Please enter a valid email address.');
    }

    try {
      const res = await fetch(
        isEditing ? `${API_URL}/${form.id}` : API_URL,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        Alert.alert('Success', isEditing ? 'Message updated.' : 'Message sent.');
        setForm({ id: null, name: '', email: '', message: '' });
        navigation.navigate('UserSuggestion');
      } else {
        Alert.alert('Error', 'Submission failed. Try again.');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error.');
      console.error(err);
    }
  };

  // Logout handler (simply navigate to Login screen)
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerRow}>
        <Header title={isEditing ? 'Edit Message' : 'Contact Us'} />
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Message"
          multiline
          value={form.message}
          onChangeText={(text) => setForm({ ...form, message: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isEditing ? 'Update Message' : 'Submit'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6c757d' }]}
          onPress={() => navigation.navigate('UserSuggestion')}
        >
          <Text style={styles.buttonText}>View Suggestions</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f2f4f7',
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  logoutButton: {
    backgroundColor: '#e94e4e',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 10,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  form: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ContactScreen;
