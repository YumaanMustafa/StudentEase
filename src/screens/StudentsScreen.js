import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput,
  TouchableOpacity, Alert
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = 'http://10.0.2.2:3000/students';

const StudentManagementScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', age: '', course: '' });

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to load students.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleAdd = async () => {
    const { name, age, course } = form;
    if (!name || !age || !course) {
      return Alert.alert('Error', 'All fields are required.');
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, course }),
      });

      if (!res.ok) throw new Error('Failed to add student');
      setForm({ name: '', age: '', course: '' });
      fetchStudents();
    } catch (error) {
      console.error('Add error:', error);
      Alert.alert('Error', 'Could not add student.');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to update student');
      setEditingId(null);
      setForm({ name: '', age: '', course: '' });
      fetchStudents();
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Could not update student.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete student');
      fetchStudents();
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Could not delete student.');
    }
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      age: student.age.toString(),
      course: student.course,
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
      <Header title="Student Management" onLogout={handleLogout} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{editingId ? '✏️ Edit Student' : '➕ Add Student'}</Text>
        <View style={styles.card}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            placeholder="Age"
            style={styles.input}
            keyboardType="numeric"
            value={form.age}
            onChangeText={(text) => handleChange('age', text)}
          />
          <TextInput
            placeholder="Course"
            style={styles.input}
            value={form.course}
            onChangeText={(text) => handleChange('course', text)}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={editingId ? handleUpdate : handleAdd}
          >
            <Text style={styles.addButtonText}>
              {editingId ? 'Update Student' : 'Add Student'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>🎓 Students List</Text>
        {students.map((student) => (
          <View key={student.id} style={styles.card}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.description}>Age: {student.age}</Text>
            <Text style={styles.price}>Course: {student.course}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => startEdit(student)} style={styles.editBtn}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Confirm Delete',
                    'Are you sure you want to delete this student?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => handleDelete(student.id),
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

export default StudentManagementScreen;
