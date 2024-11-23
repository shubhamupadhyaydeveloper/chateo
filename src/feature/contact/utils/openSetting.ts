import { Alert, Linking } from "react-native";


export const showPermissionAlert = () => {
  Alert.alert(
    'Permission Denied',
    'Chateo needs access to your contacts to add friends. Please enable permissions.',
    [
      {
        text: 'Go to Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
    {cancelable: false},
  );
};