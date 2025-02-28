import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

import TimerItem from "../components/TimerItem";
import { saveTimers, loadTimers } from "../utils/storage";

export default function HomeScreen({ navigation }) {
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadTimers().then(setTimers);
  }, []);

  const addTimer = () => {
    if (!name || !duration || !category) return;
    const newTimer = { id: Date.now().toString(), name, duration: parseInt(duration), category, remaining: parseInt(duration), status: "Paused" };
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
    setName("");
    setDuration("");
    setCategory("");
  };

  return (
    <View>
      <Text>Timers</Text>
      <TextInput placeholder="Timer Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Duration (sec)" keyboardType="numeric" value={duration} onChangeText={setDuration} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
      <Button title="Add Timer" onPress={addTimer} />
      <FlatList
  data={timers}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => <TimerItem key={index} timer={item} timers={timers} setTimers={setTimers} />}
/>



      <Button title="View History" onPress={() => navigation.navigate("History")} />
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#008080",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
