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
import { createStackNavigator } from "@react-navigation/stack";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";

type Screens = {
  Home: undefined
  Another: undefined
}

const Stack = createStackNavigator<Screens>();
const navRef = createNavigationContainerRef<Screens>()

function RootStack() {
  const [stream, setStream] = useState<MediaStream>()
  useEffect(() => {
    mediaDevices.getUserMedia({ video: true }).then(s => setStream(s))
  }, []) 

  return <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Home">
        {() => <HomeScreen stream={stream} />}
      </Stack.Screen>
      <Stack.Screen name="Another" component={AnotherScreen} />
    </Stack.Navigator>
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer ref={navRef}>
          <RootStack />
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

type Props = {
  stream: MediaStream | undefined
}

function HomeScreen({ stream }: Props) {
  const insets = useSafeAreaInsets()
  const [maxWidth, setMaxWidth] = useState(true)
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <RTCView streamURL={stream?.toURL()} style={{ flex: 1, width: maxWidth ? "100%" : "0%" }} />
      <Button title="Press me" onPress={() => {
          setMaxWidth(!maxWidth)
          navRef.current?.navigate("Another")
        }} />
    </View>
  );
}

function AnotherScreen() {
  return <View />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
