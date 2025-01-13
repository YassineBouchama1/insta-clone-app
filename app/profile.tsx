import { View, Text, Button } from 'react-native';
import { useAuth } from '~/providers/AuthProvider';

const ProfileScreen = () => {
  const { logout } = useAuth();

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
