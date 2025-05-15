import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

const API_KEY = '852bcb0c3a22c2eef8e8dba6e9d86446'; // Reemplaza con tu propia clave si es necesario

export default function Forecast() {
  const [city, setCity] = useState('La Paz');
  const [forecast, setForecast] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=15`)
      .then((res) => res.json())
      .then((data) => setForecast(data))
      .catch((error) => console.error('Error fetching forecast:', error));
  }, [city]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe una ciudad"
        onSubmitEditing={(e) => setCity(e.nativeEvent.text)}
        returnKeyType="search"
      />
      <ScrollView>
        {forecast?.forecast?.forecastday?.map((day: any, i: number) => (
          <View key={i} style={styles.dayCard}>
            <Text style={styles.date}>{day.date}</Text>
            <Text>{day.day.avgtemp_c}°C - {day.day.condition.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  dayCard: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
