import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("history").then((data) => {
      if (data) setHistory(JSON.parse(data));
    });
  }, []);

  return (
    <View>
      <Text>Completed Timers</Text>
      {history.length > 0 ? (
  <FlatList
    data={history}
    keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Ensure unique key
    renderItem={({ item }) => (
      <Text>{item.name} - {new Date(item.completedAt).toLocaleTimeString()}</Text>
    )}
  />
) : (
  <Text>No completed timers.</Text>
)}

    </View>
  );
}