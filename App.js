import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet,ActivityIndicator} from 'react-native';

import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';

import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./src/redux/store";

const { store, persistor } = reduxStore();

// Screen
import Auth from './src/Routes/Auth';

const App = () => {

  const theme = {
    palette: {
      primary: {
        main: "#2c5da2",
        contrast: "rgba(250,250,250, 0.75)",
        alert: "#ac5959",
      },
      secondary: {
        main: "rgba(0,0,0, 0.03)",
        contrast: "#ffffff",
      },
      typology: {
        main: "#000",
        contrast: "#FFF",
        label: "#aeadad",
      },
      shadow: {
        main: "#000",
        contrast: "#FFF",
      },
      icon: {
        main: "#2c5da2",
        contrast: "#6d6c6c",
        default: "#FFF",
      },
      border: {
        main: "#6d6c6c",
        contrast: "#FFF",
      },
      error: {
        main: "#cf1d1d",
        contrast: "#ffffff",
      },
    },
    inputs: {
      light: {
        otp: {
          color: "#333333",
        },
      },
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Auth />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
const Styles = StyleSheet.create({

});

export default App;
