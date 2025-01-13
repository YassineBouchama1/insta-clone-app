import { useCallback, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';
import { AuthError } from '~/types/auth';

const logo = require('~/assets/icon.png');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      }
    }, [isAuthenticated])
  );

  if (isAuthenticated) {
    router.replace('/(tabs)');
  }



  const handleLogin = async () => {
    try {
      setErrors({}); // here clear prev errors
      await login(email, password);
      router.replace('/(tabs)/feed');
    } catch (error: any) {

      if (error instanceof AuthError && error.code === 'VALIDATION_ERROR') {
        setErrors(error.details || {});
      } else {
        Alert.alert('Error', error.message || 'Invalid credentials');
      }
    }
  };


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email.join(', ')}</Text>}

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password.join(', ')}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
