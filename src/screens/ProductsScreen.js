import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput,
  TouchableOpacity, Alert
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = 'http://192.168.100.20:3000/products';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to load products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleAdd = async () => {
    const { name, description, price } = form;
    if (!name || !price) {
      return Alert.alert('Error', 'Product name and price are required.');
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price }),
      });

      if (!res.ok) throw new Error('Failed to add product');
      setForm({ name: '', description: '', price: '' });
      fetchProducts();
      navigation.navigate('ProductList');
    } catch (error) {
      console.error('Add error:', error);
      Alert.alert('Error', 'Could not add product.');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to update product');
      setEditingId(null);
      setForm({ name: '', description: '', price: '' });
      fetchProducts();
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Could not update product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Could not delete product.');
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
    });
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

  return (
    <View style={styles.container}>
      {/* Consistent Header with Logout */}
      <Header title="Products" onLogout={handleLogout} />

      {/* Navigate to Product List */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductList')}
        style={styles.viewListBtn}
      >
        <Text style={styles.viewListBtnText}>View All Products</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{editingId ? '✏️ Edit Product' : '➕ Add Product'}</Text>
        <View style={styles.card}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            keyboardType="numeric"
            value={form.price}
            onChangeText={(text) => handleChange('price', text)}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={editingId ? handleUpdate : handleAdd}
          >
            <Text style={styles.addButtonText}>
              {editingId ? 'Update Product' : 'Add Product'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>🛍️ Products (Preview)</Text>
        {products.map((product) => (
          <View key={product.id} style={styles.card}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => startEdit(product)} style={styles.editBtn}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Confirm Delete',
                    'Are you sure you want to delete this product?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => handleDelete(product.id),
                      },
                    ],
                    { cancelable: true }
                  )
                }
                style={[styles.editBtn, { backgroundColor: 'red', marginLeft: 10 }]}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  viewListBtn: {
    backgroundColor: '#008CBA',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewListBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContainer: { flexGrow: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 5 },
  price: { fontSize: 16, fontWeight: '600' },
  input: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
  editBtn: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
  },
  btnText: { color: '#fff' },
});

export default ProductsScreen;
