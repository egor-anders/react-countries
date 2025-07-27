import { SET_COUNTRIES, SET_ERROR, SET_LOADING } from "./countries-actions";

const initialState = {
  status: "idle", // fulfilled / rejected / loading
  list: [],
  err: null,
};

export const countriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING: {
      return {
        ...state,
        status: "loading",
      };
    }

    case SET_COUNTRIES: {
      const sortedCountries = [...payload].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      return {
        ...state,
        status: "fulfilled",
        list: sortedCountries,
      };
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
