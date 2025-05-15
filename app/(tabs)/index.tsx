import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const API_KEY = '852bcb0c3a22c2eef8e8dba6e9d86446';

export default function CurrentWeather() {
  const [city, setCity] = useState('La Paz');
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then(res => res.json())
      .then(data => setWeather(data));
  }, [city]);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Ingresa ciudad" onSubmitEditing={(e) => setCity(e.nativeEvent.text)} />
      {weather?.current ? (
        <>
          <Text style={styles.title}>{weather.location.name}, {weather.location.country}</Text>
          <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
          <Text style={styles.condition}>{weather.current.condition.text}</Text>
        </>
      ) : <Text>Cargando clima...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16, width: '80%' },
  title: { fontSize: 24, fontWeight: 'bold' },
  temp: { fontSize: 32, marginTop: 8 },
  condition: { fontSize: 18, marginTop: 4 }
});

