export const SET_LOADING = "@@details/SET_LOADING";
export const SET_ERROR = "@@details/SET_ERROR";
export const SET_COUNTRY = "@@details/SET_COUNTRY";
export const CLEAR_DETAILS = "@@details/CLEAR_DETAILS";
export const SET_NEIGHBORS = "@@details/SET_NEIGHBORS";

const setLoading = () => ({
  type: SET_LOADING,
});

export const clearDetails = () => ({
  type: CLEAR_DETAILS,
});

const setError = (err) => ({
  type: SET_ERROR,
  payload: err,
});

const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});

const setNeighbors = (countries) => ({
  type: SET_NEIGHBORS,
  payload: countries,
});

export const loadCountryByName =
  (name) =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    client
      .get(api.searchByCountry(name))
      .then(({ data }) => dispatch(setCountry(data[0])))
      .catch((err) => dispatch(setError(err)));
  };

export const loadNeighbors =
  (neighbors) =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.filterByCode(neighbors))
      .then(({ data }) =>
        dispatch(setNeighbors(data.map((c) => c.name.common)))
      )
      .catch(console.error);
  };
