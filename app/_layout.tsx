import '../global.css';
import React from 'react';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import AuthProvider, { useAuth } from '~/providers/AuthProvider';

export const unstable_settings = {
  initialRouteName: '(tabs)/feed',
};

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {

  const { isLoading } = useAuth();


  // Don't render anything until authentication check is complete
  if (isLoading) {
    return null;
  }

  return (

    <Slot />

  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);



  useEffect(() => {
    async function prepare() {
      try {

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);



  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);


  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
