export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  err: state.countries.err,
  qty: state.countries.list.length,
});

export const selectAllCountries = (state) => state.countries.list;

export const selectVisibleCountries = (state, {search='', region = ''}) => {
  return state.countries.list.filter((c) => {
    return c.name.common.toLowerCase().includes(search.toLowerCase()) && c.region.includes(region);
  });
};
