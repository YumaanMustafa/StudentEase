import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = () => {
  const navigation = useNavigation();

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="SimpleShop" onLogout={handleLogout} />
      </View>

      {/* Welcome Section */}
      <View style={styles.hero}>
        <Text style={styles.welcomeText}>
          Welcome to SimpleShop, your one stop destination for all electronic items
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.buttonText}>Browse Products</Text>
          </TouchableOpacity>

          <View style={styles.buttonSpacing} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Products Section */}
      <View style={styles.featured}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.productList}>
          {/* Product 1 */}
          <View style={styles.productCard}>
            <Image
              style={styles.productImage}
              source={{
                uri: 'https://i.pcmag.com/imagery/roundup-products/04yTYu77dnI8MNmwxpmF311.fit_lim.size_919x518.v1674495235.jpg',
              }}
            />
            <Text style={styles.productTitle}>Top selling product</Text>
          </View>

          {/* Product 2 */}
          <View style={styles.productCard}>
            <Image
              style={styles.productImage}
              source={{
                uri: 'https://xcessorieshub.com/wp-content/uploads/2023/10/EarFun-Air-Mini-2-1.png',
              }}
            />
            <Text style={styles.productTitle}>Our special</Text>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f4f7',
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  hero: {
    backgroundColor: '#ffffff',
    padding: 25,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpacing: {
    height: 12,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30,
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
  featured: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 15,
    width: '48%',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  productTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },
});

export default HomeScreen;
