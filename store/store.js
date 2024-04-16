import { configureStore } from "@reduxjs/toolkit";
import tracksReducer from "../components/TracksSlice";

export default configureStore({
    reducer: {
        tracks: tracksReducer
    }
})