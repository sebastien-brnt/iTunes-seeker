import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import tracksReducer from "../components/slices/TracksSlice";
import ratingsReducer from "../components/slices/RatingsSlice";

// Configuration de la persistance
const persistConfig = {
  key: 'root',
  storage,
};

// Création des reducers
const rootReducer = combineReducers({
  tracks: tracksReducer,
  ratings: ratingsReducer
});

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false // Désactivation de la vérification de sérialisation
    }),
});

// Création du persistor
export const persistor = persistStore(store);


