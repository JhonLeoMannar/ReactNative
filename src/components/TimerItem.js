import React, { useState, useEffect } from "react";
import { View, Text, Button} from "react-native";
import { ProgressBar } from 'react-native-paper';
import { saveTimers } from "../utils/storage";

export default function TimerItem({ timer, timers, setTimers }) {
  const [remaining, setRemaining] = useState(timer.remaining);
  const [running, setRunning] = useState(false);
  


  useEffect(() => {
    let interval;
    if (running && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    } else if (remaining === 0) {
      completeTimer();
    }
    return () => clearInterval(interval);
  }, [running, remaining]);

  const completeTimer = () => {
    setRunning(false);
    const updatedTimers = timers.filter((t) => t.id !== timer.id);
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
    AsyncStorage.getItem("history").then((data) => {
      const history = data ? JSON.parse(data) : [];
      history.push({ ...timer, completedAt: Date.now() });
      AsyncStorage.setItem("history", JSON.stringify(history));
    });
  };

  return (
    <View>
      <Text>{timer.name}</Text>
      <ProgressBar 
  styleAttr="Horizontal" 
  indeterminate={false} 
  progress={isNaN(remaining / timer.duration) ? 0 : Math.max(0, Math.min(1, remaining / timer.duration))} 
/>

      <Button title={running ? "Pause" : "Start"} onPress={() => setRunning(!running)} />
      <Button title="Reset" onPress={() => setRemaining(timer.duration)} />
    </View>
  );
}