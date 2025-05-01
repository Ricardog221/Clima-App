import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator, Alert } from 'react-native';

interface ForecastData {
  date: string;
  tempMax: number;
  tempMin: number;
}

export default function ForecastScreen() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);

  const getCoordinates = async (cityName: string): Promise<{ lat: number; lon: number } | null> => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`);
      const data = await res.json();
      if (data.length === 0) return null;
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getForecast = async () => {
    setLoading(true);
    setForecast([]);

    const coords = await getCoordinates(city);
    if (!coords) {
      setLoading(false);
      Alert.alert('Error', 'Ciudad no encontrada');
      return;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const days = data.daily.time.map((date: string, i: number) => ({
        date,
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
      }));
      setForecast(days);
    } catch (err) {
      Alert.alert('Error', 'No se pudo obtener el pronóstico');
    }

    setLoading(false);
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Pronóstico de 15 días</Text>
      <TextInput
        placeholder="Ej. Ciudad de México"
        value={city}
        onChangeText={setCity}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginVertical: 10,
        }}
      />
      <Button title="Buscar pronóstico" onPress={getForecast} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      <ScrollView style={{ marginTop: 20 }}>
        {forecast.map((day, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{day.date}</Text>
            <Text>Máx: {day.tempMax} °C</Text>
            <Text>Mín: {day.tempMin} °C</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

