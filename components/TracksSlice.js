import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

const tracksSlice = createSlice({
    name: "tracks",
    initialState: [],  // State par défaut
    reducers: {
        // Reducer pour ajouter un morceau à la playlist
        addTrack: (state, action) => {
            state.push(action.payload);
        },

        // Reducer pour enlever un morceau de la playlist
        removeTrack: (state, action) => {
            const index = state.findIndex(track => track.trackId === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const { addTrack, removeTrack } = tracksSlice.actions;

// Sélecteur pour obtenir tous les tracks
export const trackSelector = (state) => state.tracks;

// Sélecteur pour vérifier si un track spécifique existe
export const trackExists = createSelector(
    [trackSelector, (state, trackId) => trackId],
    (tracks, trackId) => tracks.some(track => track.trackId === trackId)
);

export default tracksSlice.reducer;
