import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '~/providers/AuthProvider';

export default function Index() {
  const { isAuthenticated ,acceptedTerms ,isLoading} = useAuth();


  // here we check if the user is authenticated
  // if they are, we redirect them to the tabs layout
  if (isAuthenticated) {


    return acceptedTerms ? <Redirect href="/(tabs)/tasks" /> : <Redirect href="/(auth)/terms" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
