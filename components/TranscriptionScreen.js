import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import axios from 'axios'; // Axios module for HTTP requests

const TranscriptionScreen = ({ route }) => {
  // Initialize state for the transcription result
  const [transcription, setTranscription] = useState('');

  // Send audio file for transcription
  const sendAudio = async () => {
    try {
      // Create a new form data instance
      const formData = new FormData();

      // Append the audio file to the form data
      formData.append('audio', {
        uri: route.params.audioUri,
        type: 'audio/x-wav',
        name: 'audio.wav',
      });

      // Send a POST request to the remote server with the audio file
      const response = await axios.post('http://<REMOTE_SERVER_URL>', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update state with the transcription result
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <Text>Transcription Result:</Text>
          <Text>{transcription || 'Waiting for transcription...'}</Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={sendAudio}>
        Send
      </Button>
    </View>
  );
};

export default TranscriptionScreen;
