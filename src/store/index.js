import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistedReducer } from "./root-reducer";
import axios from "axios";
import * as api from "../config";
import persistStore from "redux-persist/es/persistStore";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export const store = createStore(
  persistedReducer,
  composeEnhancer(
    applyMiddleware(
      thunk.withExtraArgument({
        client: axios,
        api,
      })
    )
  )
);

 export const persistor = persistStore(store)
