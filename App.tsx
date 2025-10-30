/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RTCView, mediaDevices, MediaStream } from "react-native-webrtc"
import { Button, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from "react";

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [stream, setStream] = useState<MediaStream>()
  useEffect(() => {
    mediaDevices.getUserMedia({ video: true }).then(s => setStream(s))
  }, []) 

  const insets = useSafeAreaInsets()

  const [maxWidth, setMaxWidth] = useState(false)

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Button title="Press me" onPress={() => setMaxWidth(w => !w)} />
      <View style={{ flexDirection: "row", flex: 1 }}>
        <RTCView streamURL={stream?.toURL()} style={{ flex: 1 }} />
        <View style={{ height: "100%", width: maxWidth ? "100%" : "0%" }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
