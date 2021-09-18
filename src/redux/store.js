import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStore, applyMiddleware} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import combinedReducers from "./reducers";

const config = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
};

const persistedReducer = persistReducer(config, combinedReducers);

const reduxStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return {store, persistor};
};

export default reduxStore;
