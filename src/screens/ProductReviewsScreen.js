import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

const API_URL = 'http://192.168.100.20:3000'; // Update if needed

const ReviewsScreen = ({ navigation }) => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    product_id: '',
    reviewer_name: '',
    rating: '',
    comment: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/reviews`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      Alert.alert('Error', 'Could not fetch reviews');
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { product_id, reviewer_name, rating, comment } = form;

    if (!product_id || !reviewer_name || !rating) {
      Alert.alert('Please fill all required fields');
      return;
    }

    const endpoint = editingId
      ? `${API_URL}/reviews/${editingId}`
      : `${API_URL}/reviews`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: parseInt(product_id),
          reviewer_name,
          rating: parseInt(rating),
          comment,
        }),
      });

      if (res.ok) {
        Alert.alert(editingId ? 'Review updated' : 'Review added');
        setForm({ product_id: '', reviewer_name: '', rating: '', comment: '' });
        setEditingId(null);
        fetchReviews();
      } else {
        Alert.alert('Failed to save review');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    }
  };

  const handleEdit = (review) => {
    setForm({
      product_id: String(review.product_id),
      reviewer_name: review.reviewer_name,
      rating: String(review.rating),
      comment: review.comment || '',
    });
    setEditingId(review.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        Alert.alert('Review deleted');
        fetchReviews();
      } else {
        Alert.alert('Error deleting review');
      }
    } catch (err) {
      Alert.alert('Network error', err.message);
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

  return (
    <View style={styles.container}>
        <Header title="Product Reviews" onLogout={handleLogout} />
      <ScrollView contentContainerStyle={styles.content}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.card}>
            <Text style={styles.name}>Reviewer: {review.reviewer_name}</Text>
            <Text>Product ID: {review.product_id}</Text>
            <Text>Rating: {review.rating}/5</Text>
            <Text>Comment: {review.comment}</Text>
            <View style={styles.buttonRow}>
              <Button title="Edit" onPress={() => handleEdit(review)} />
              <Button
                title="Delete"
                color="red"
                onPress={() => handleDelete(review.id)}
              />
            </View>
          </View>
        ))}

        <Text style={styles.title}>{editingId ? 'Edit Review' : 'Add a Product Review'}</Text>

        <TextInput
          placeholder="Product ID"
          value={form.product_id}
          onChangeText={(val) => handleChange('product_id', val)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Your Name"
          value={form.reviewer_name}
          onChangeText={(val) => handleChange('reviewer_name', val)}
          style={styles.input}
        />
        <TextInput
          placeholder="Rating (1-5)"
          value={form.rating}
          onChangeText={(val) => handleChange('rating', val)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Comment"
          value={form.comment}
          onChangeText={(val) => handleChange('comment', val)}
          style={styles.input}
        />
        <Button
          title={editingId ? 'Update Review' : 'Submit Review'}
          onPress={handleSubmit}
        />
      </ScrollView>

      <Footer />
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  name: { fontWeight: 'bold', marginBottom: 5 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
