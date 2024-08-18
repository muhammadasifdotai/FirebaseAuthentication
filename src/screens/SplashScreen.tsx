// import { View, Text } from 'react-native';
// import React, { useEffect } from 'react';
// import Auth from '@react-native-firebase/auth';
// import { StackActions, useNavigation } from '@react-navigation/native';

// export default function SplashScreen() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = Auth().onAuthStateChanged(user => {
//         console.log('user Slash Screen',user)
//       const routeName = user ? 'Home' : 'Login';
//       navigation.dispatch(StackActions.replace(routeName));
//     });

//     // Clean up the listener on unmount
//     return unsubscribe;
//   }, [navigation]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>SplashScreen</Text>
//     </View>
//   );
// }
