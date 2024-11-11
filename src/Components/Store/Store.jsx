import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/Movieslice";
import peopleReducer from "./reducers/Personslice";
// import tvReducer from "./reducers/Tvslice";
//  import tvReducer from "./reducers/Tvslice";
 import tvReducer from "./reducers/Tvslice";
export const store = configureStore({
    reducer: {
      movie: movieReducer,
      person: peopleReducer,
      tv: tvReducer,
    }

});