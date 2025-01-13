import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '~/components/Button';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {

  const router = useRouter()
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View style={styles.container}>
        <Button onPress={() => { router.push('/profile') }} title='to profil' />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
