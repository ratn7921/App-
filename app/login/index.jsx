import { View, Image,Text, Pressable } from 'react-native'
import React from 'react'
import Colors, { Color } from './../../constants/Colors'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'


export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {

    useWarmUpBrowser()
   
   
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
   
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
            redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
          })
    
          if (createdSessionId) {
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error('OAuth error', err)
        }
      }, [])


  return (
    <View style={{

    }}>
      <Image
        source={require('./../../assets/images/golden-retriever-dog-sitting-up-looking-straight-camera-with-its-tongue-out_805558-190.png')} // Make sure the image path is correct
        style={{ width: '100%', height: 550 }}
      />


   <View 
   style={{
    padding:20,
    display:'flex',
    alignItems:'center'
   }}
   > 
    <Text style={{
        fontFamily:'PlaywriteGBS-italic',
        fontSize:23,
        textAlign:'center'
    }}> 
Ready to Get a new friend
    </Text>
    <Text style={{
        fontFamily:'PlaywriteGBS-Light',
        fontSize:15,
        textAlign:'center',
color:Colors.GRAY
    }}>Let's adopt the pet which you like and make there life happy again</Text>

<Pressable 
                    onPress={onPress}
                    style={{
                        padding: 26,
                        marginTop: 10,
                        backgroundColor: Colors.PRIMARY,
                        width: '100%',
                        borderRadius: 14,
                    }}
                >
                    <Text style={{
                        fontFamily: 'PlaywriteGBS-italic',
                        fontSize: 15,
                        textAlign: 'center',
                    }}>Get started</Text>
                </Pressable>
   </View>
    </View>
  )
}














// import { View, Image, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import React, { useCallback, useEffect, useState } from 'react';
// import Colors from './../../constants/Colors';
// import { useOAuth } from '@clerk/clerk-expo';
// import * as Linking from 'expo-linking';
// import * as WebBrowser from 'expo-web-browser';
// import * as Font from 'expo-font';

// export const useWarmUpBrowser = () => {
//     React.useEffect(() => {
//         void WebBrowser.warmUpAsync();
//         return () => {
//             void WebBrowser.coolDownAsync();
//         };
//     }, []);
// };

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen() {
//     useWarmUpBrowser();
//     const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

//     const [fontsLoaded, setFontsLoaded] = useState(false);

//     useEffect(() => {
//         async function loadFonts() {
//             await Font.loadAsync({
//                 'PlaywriteGBS-italic': require('./../../assets/fonts/PlaywriteGBS-Italic.ttf'), // Correct path to your font file
//                 'PlaywriteGBS-Light': require('./../../assets/fonts/PlaywriteGBS-Light.ttf'), // Correct path to your font file
//             });
//             setFontsLoaded(true);
//         }

//         loadFonts();
//     }, []);

//     const onPress = useCallback(async () => {
//         try {
//             const { createdSessionId } = await startOAuthFlow({
//                 redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' })
//             });

//             if (createdSessionId) {
//                 // Handle successful login (e.g., navigate to home)
//                 console.log('Logged in successfully!');
//                 // Navigate to your home screen here
//             } else {
//                 // Handle sign-in or sign-up for next steps such as MFA
//                 console.log('Sign-in or sign-up required.');
//             }
//         } catch (err) {
//             console.error('OAuth error', err);
//             Alert.alert('Error', JSON.stringify(err, null, 2)); // Show detailed error
//         }
//     }, [startOAuthFlow]);

//     if (!fontsLoaded) {
//         return <ActivityIndicator size="large" color={Colors.PRIMARY} />; // Loading indicator while fonts are loading
//     }

//     return (
//         <View style={styles.container}>
//             <Image
//                 source={require('./../../assets/images/golden-retriever-dog-sitting-up-looking-straight-camera-with-its-tongue-out_805558-190.png')}
//                 style={styles.image}
//             />

//             <View style={styles.textContainer}>
//                 <Text style={styles.titleText}>Ready to Get a new friend</Text>
//                 <Text style={styles.subtitleText}>Let's adopt the pet which you like and make their life happy again</Text>

//                 <Pressable onPress={onPress} style={styles.button}>
//                     <Text style={styles.buttonText}>Get started</Text>
//                 </Pressable>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     image: {
//         width: '100%',
//         height: 550,
//     },
//     textContainer: {
//         padding: 20,
//         alignItems: 'center',
//     },
//     titleText: {
//         fontFamily: 'PlaywriteGBS-italic',
//         fontSize: 23,
//         textAlign: 'center',
//     },
//     subtitleText: {
//         fontFamily: 'PlaywriteGBS-Light',
//         fontSize: 15,
//         textAlign: 'center',
//         color: Colors.GRAY,
//     },
//     button: {
//         padding: 26,
//         marginTop: 10,
//         backgroundColor: Colors.PRIMARY,
//         width: '100%',
//         borderRadius: 14,
//     },
//     buttonText: {
//         fontFamily: 'PlaywriteGBS-italic',
//         fontSize: 15,
//         textAlign: 'center',
//     },
// });
