import { configureStore } from "@reduxjs/toolkit";
import tracksReducer from "../components/slices/TracksSlice";
import ratingsReducer from "../components/slices/RatingsSlice";

export default configureStore({
    reducer: {
        tracks: tracksReducer,
        ratings: ratingsReducer
    }
})