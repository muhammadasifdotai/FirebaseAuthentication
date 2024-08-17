import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function HomeScreen() {
  // useRoute: pura ka pura params ka object hay, to is leyee hum nay isay destructure kr leyee hay.
  // params: may humay 2 cheezain mil rhi hay email or uid.
  const route = useRoute();
  const {email, uid} = route.params;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Eamil: {email}</Text>
      <Text>UID: {uid} </Text>
    </View>
  );
}
