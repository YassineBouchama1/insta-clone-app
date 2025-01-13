import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '~/providers/AuthProvider';

export default function Index() {
    const { isAuthenticated, isLoading } = useAuth();


    // here we check if the user is authenticated
    // if they are, we redirect them to the tabs layout
    if (isAuthenticated) {


        return <Redirect href="/(tabs)/feed" />
    } else {
        return <Redirect href="/(auth)/login" />;
    }
}
