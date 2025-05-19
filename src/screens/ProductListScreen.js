import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet, Alert, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import Header from '../components/Header';
const API_URL = 'http://192.168.100.20:3000/products';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to load products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>

      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate('Reviews', { productId: item.id })}
      >
        <Text style={styles.reviewButtonText}>Read Reviews</Text>
      </TouchableOpacity>
    </View>
  );
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
  return (
    <View style={styles.container}>
      {/* Header with Title and Logout Button */}
       <Header title="Products" onLogout={handleLogout} />

      <Text style={styles.title}>Product List</Text>

      <TextInput
        placeholder="Search products..."
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  description: { fontSize: 14, color: '#666', marginBottom: 6 },
  price: { fontSize: 16, fontWeight: '600' },
  reviewButton: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
