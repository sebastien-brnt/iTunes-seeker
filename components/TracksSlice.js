import { createSlice } from "@reduxjs/toolkit";

const tracksSlice = createSlice({
    name: "tracks",
    initialState: [],  // State par défaut
    reducers: {
        // Reducer pour ajouter un morceau à la playlist
        addTrack: (state, action) => {
            state.push(action.payload);
        },

        // Reducer pour enlever un morceau de la playlist
        removeTrack: (state, action) =>{
            state.splice(action.payload, 1);
        }
    }
});

export const { addTrack, removeTrack } = tracksSlice.actions;
export const trackSelector = (state) => state.tracks;
export default tracksSlice.reducer;