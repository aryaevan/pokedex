import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";
import { Pressable } from 'react-native';
import { ClearFavorite } from '@/pokeComponent/Favorite';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            title: 'Pokedex', 
            headerTitleAlign:'center',
            headerRight: () => (
              <Link href="/favorite" asChild>
                <Pressable style={{height:50, paddingHorizontal:10, justifyContent:'center'}}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="heart-o"
                      size={23}
                      color={'black'}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            }}/>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="favorite" options={{title:'Favorite Pokemon', presentation: 'modal',
            headerRight: () => (
                <Pressable style={{height:50, paddingHorizontal:10, justifyContent:'center'}} onPress={ClearFavorite}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="trash-o"
                      size={23}
                      color={'black'}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              )}} />
  
        <Stack.Screen name="detail" options={{ title:'Pokemon Detail', presentation: 'modal' }} />
      </Stack>
    </GluestackUIProvider>
  );
}
