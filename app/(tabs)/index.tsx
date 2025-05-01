import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';

interface Weather {
  temperature: number;
  windspeed: number;
}

export default function CurrentWeather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
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

  const getWeather = async () => {
    setLoading(true);
    setWeather(null);

    const coords = await getCoordinates(city);
    if (!coords) {
      setLoading(false);
      Alert.alert('Error', 'Ciudad no encontrada');
      return;
    }

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&timezone=auto`
      );
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (err) {
      Alert.alert('Error', 'No se pudo obtener el clima');
    }

    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Buscar Clima por Ciudad</Text>
      <TextInput
        placeholder="Ej. La Paz, Mexico"
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
      <Button title="Buscar Clima" onPress={getWeather} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {weather && !loading && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Temperatura: {weather.temperature} °C</Text>
          <Text>Viento: {weather.windspeed} km/h</Text>
        </View>
      )}
    </View>
  );
}
