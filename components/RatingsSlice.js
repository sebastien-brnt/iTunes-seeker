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
            const index = state.findIndex(rating => rating.track.trackId === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const { addRating, removeRating } = ratingsSlice.actions;

// Sélecteur pour obtenir toutes les notations
export const ratingsSelector = (state) => state.ratings;

// Sélecteur pour obtenir une seule notation en fonction de l'id du track
export const ratingSelectorById = (state, trackId) => {
    // Vérifie si il y a des morceaux noté et si un trackId est donné
    if (state.ratings && trackId) {
        // Parcours les ratings pour trouver celui qui correspond au trackId donné
        for (const rating of Object.values(state.ratings)) {
            if (rating.track && rating.track.trackId === trackId) {
                return rating;
            }
        }
    }
    
    // Retourne undefined si aucun rating correspondant n'a été trouvé
    return undefined;
};

// Sélecteur pour vérifier si un track a déjà été noté
export const ratingExists = createSelector(
    [ratingsSelector, (state, trackId) => trackId],
    (ratings, trackId) => ratings.some(rating => rating.track.trackId === trackId),
);

export default ratingsSlice.reducer;
