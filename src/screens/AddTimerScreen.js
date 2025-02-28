import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { TimerContext } from '../context/TimerContext';

export default function AddTimerScreen({ navigation }) {
  const { addTimer } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleAdd = () => {
    addTimer({ name, duration: Number(duration) });
    navigation.goBack();
  };

  return (
    <View>
      <Text>Timer Name:</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Enter Timer Name" />
      <Text>Duration (seconds):</Text>
      <TextInput value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <Button title="Save Timer" onPress={handleAdd} />
    </View>
  );
}
