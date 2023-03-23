import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AudioRecorderScreen from './components/RecordingScreen';
import TranscriptionScreen from './components/TranscriptionScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AudioRecorder">
          <Stack.Screen
            name="AudioRecorder"
            component={AudioRecorderScreen}
            options={{ title: 'Audio Recorder' }}
          />
          <Stack.Screen
            name="Transcription"
            component={TranscriptionScreen}
            options={{ title: 'Transcription' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
