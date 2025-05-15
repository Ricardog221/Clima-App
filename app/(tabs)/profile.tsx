import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Profile() {
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function login() {
    if (email && pass) setUser(email);
  }

  function logout() {
    setUser(null);
    setEmail('');
    setPass('');
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Bienvenido, {user}</Text>
          <Button title="Cerrar sesión" onPress={logout} />
        </>
      ) : (
        <>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={pass} onChangeText={setPass} />
          <Button title="Iniciar sesión" onPress={login} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16, width: '80%' }
});




