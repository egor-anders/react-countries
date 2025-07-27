import { CLEAR_DETAILS, SET_COUNTRY, SET_ERROR, SET_LOADING } from "./details-actions";

const initialState = {
  status: "idle",
  currentCountry: null,
  err: null,
};

export const detailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING: {
      return {
        ...state,
        status: "loading",
      };
    }

     case CLEAR_DETAILS: {
      return initialState
    }

    case SET_COUNTRY: {
      return {
        ...state,
        status: 'fulfilled',
        currentCountry: payload
      }
    }

    case SET_ERROR: {
      return {
        ...state,
        status: "rejected",
        err: payload,
      };
    }

    default: {
      return state;
    }
  }
};
