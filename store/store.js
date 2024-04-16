import { configureStore } from "@reduxjs/toolkit";
import tracksReducer from "../components/TracksSlice";
import ratingsReducer from "../components/RatingsSlice";

export default configureStore({
    reducer: {
        tracks: tracksReducer,
        ratings: ratingsReducer
    }
})