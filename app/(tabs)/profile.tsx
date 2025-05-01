import React from 'react';
import { View, Image, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Image
        source={{ uri: 'https://i.imgur.com/2yaf2wb.jpg' }} 
        style={{ width: 150, height: 150, borderRadius: 75 }}
      />

      <Text style={{ marginTop: 10, fontSize: 18 }}>Ricardo Garayzar</Text>
    </View>
  );
}


