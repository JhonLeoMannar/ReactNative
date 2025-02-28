import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);

  // Load timers from storage
  const loadTimers = async () => {
    const savedTimers = await AsyncStorage.getItem('timers');
    if (savedTimers) setTimers(JSON.parse(savedTimers));
  };

  // Add new timer
  const addTimer = (timer) => {
    const newTimers = [...timers, timer];
    setTimers(newTimers);
    AsyncStorage.setItem('timers', JSON.stringify(newTimers));
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer, loadTimers }}>
      {children}
    </TimerContext.Provider>
  );
};
