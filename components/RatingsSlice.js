import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

const ratingsSlice = createSlice({
    name: "ratings",
    initialState: [],  // State par défaut
    reducers: {
        // Reducer pour ajouter une notation
        addRating: (state, action) => {
            state.push(action.payload);
        },

        // Reducer pour enlever une notation
        removeRating: (state, action) => {
            const index = state.findIndex(rating => rating.trackId === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const { addRating, removeRating } = ratingsSlice.actions;

// Sélecteur pour obtenir toutes les notations
export const ratingsSelector = (state) => state.ratings;

// Sélecteur pour vérifier si un track a déjà été noté
export const ratingExists = createSelector(
    [ratingsSelector, (state, trackId) => trackId],
    (ratings, trackId) => ratings.some(track => rating.trackId === trackId)
);

export default ratingsSlice.reducer;
