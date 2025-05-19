import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert, TouchableOpacity, Text, Image } from "react-native";  // <-- import Image
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://192.168.100.20:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Success', data.message || 'User registered!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error || 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Network Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>

        {/* Base64 Image added here */}
        <Image
           source={{uri: "data:image/png;base64,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"}}
           style={styles.image}
        />

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Sign Up" onPress={handleSignup} />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  formContainer: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 12, padding: 10, borderRadius: 5 },
  linkText: { marginTop: 12, color: "blue", textAlign: "center" },
  image: { width: 100, height: 100, alignSelf: "center", marginBottom: 20 }, // Adjust size and spacing as you like
});

export default SignupScreen;
