/* Redux Toolkit Store Configuration
Store: Global state accessible throughout the app

Slice: A slice of the global state (UserState == UserSlice,...), containing a reducer and actions
Action: An event that can change the state, dispatched to the store
    // Type: A string that describes the action
    // Payload: Additional data sent with the action
Reducer: A function that takes the current state and an action, and returns a new state
    // State: The current state of the slice
    // Action: The action dispatched to the reducer
    // Returns: The new state after applying the action

 |----- ACTION ----> REDUCER ----> STORE---|
 |                                         |  
 |                                         |                                 
 |<---- DISPATCH <----- STATE <------ SUBSCRIBE  


Middleware: A function that can intercept actions before they reach the reducer, used for logging, async operations, etc.
*/

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice'
import moviesReducer from './features/movies/moviesSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        movies: moviesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
