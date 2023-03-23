import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Audio } from 'expo-av';

const AudioRecorderScreen = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [recordingStatus, setRecordingStatus] = useState('not started');
  const [recordingDuration, setRecordingDuration] = useState(0);

  useEffect(() => {
    let timerId;
    if (recordingStatus === 'recording') {
      timerId = setInterval(() => {
        setRecordingDuration((duration) => duration + 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [recordingStatus]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recordingObj = new Audio.Recording();
      await recordingObj.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingObj.startAsync();
      setRecording(recordingObj);
      setRecordingStatus('recording');
    } catch (error) {
      console.log('Error starting recording:', error);
    }
  };

  const pauseRecording = async () => {
    try {
      await recording.pauseAsync();
      setRecordingStatus('paused');
    } catch (error) {
      console.log('Error pausing recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const audioUri = recording.getURI();
      setRecordingStatus('stopped');
      setRecordingDuration(0);
      navigation.navigate('Transcription', { audioUri });
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };

  const resumeRecording = async () => {
    try {
      await recording.resumeAsync();
      setRecordingStatus('recording');
    } catch (error) {
      console.log('Error resuming recording:', error);
    }
  };

  const renderRecordingButtons = () => {
    if (recordingStatus === 'not started') {
      return (
        <Button mode="contained" onPress={startRecording}>
          Start Recording
        </Button>
      );
    } else if (recordingStatus === 'recording') {
      return (
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={pauseRecording}>
            Pause
          </Button>
          <Button mode="contained" onPress={stopRecording}>
            Stop
          </Button>
        </View>
      );
    } else if (recordingStatus === 'paused') {
      return (
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={resumeRecording}>
            Resume
          </Button>
          <Button mode="contained" onPress={stopRecording}>
            Stop
          </Button>
        </View>
      );
    } else {
      return null;
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatDuration(recordingDuration)}</Text>
      {renderRecordingButtons()}
      <Button mode="contained" onPress={() => navigation.goBack()}>
         Cancel
     </Button>
  </View>
 );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
buttonContainer: {
  flexDirection: 'row',
  marginTop: 20,
},
timerText: {
  fontSize: 30,
  fontWeight: 'bold',
  marginBottom: 20,
 },
});

export default AudioRecorderScreen;

