import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  useFonts({
    'PlaywriteGBS': require('./../assets/fonts/PlaywriteGBS-Regular.ttf'),
    'PlaywriteGBS-Light': require('./../assets/fonts/PlaywriteGBS-Light.ttf'),
    'PlaywriteGBS-Italic': require('./../assets/fonts/PlaywriteGBS-Italic.ttf')

  })
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}>

      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="login/index"
          options={{
            headerShown: false
          }}
        />

      </Stack>

    </ClerkProvider>

  );
}


