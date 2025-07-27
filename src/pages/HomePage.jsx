import { useNavigate } from "react-router-dom";

import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountriesInfo,
  selectVisibleCountries,
} from "../store/countries/countries-selectors";
import { loadCountries } from "../store/countries/countries-actions";
import { useEffect } from "react";
import { selectControls } from "../store/controls/controls-selectors";
import throttle from "lodash.throttle";

export const HomePage = () => {
  const navigate = useNavigate();
  const { search, region } = useSelector(selectControls);

  const throttledVisibleCountries = throttle(
    (state, { search, region }) =>
      selectVisibleCountries(state, { search, region }),
    300,
    { leading: true, trailing: true }
  );

  const countries = useSelector((state) =>
    throttledVisibleCountries(state, { search, region })
  );
  const { status, err, qty } = useSelector(selectCountriesInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return (
    <>
      <Controls />

      {err && <h2>Can't fetch data</h2>}
      {status === "loading" && <h2>Loading...</h2>}

      {status === "fulfilled" && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name.common,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital[0],
                },
              ],
            };

            return (
              <Card
                key={c.name.common}
                onClick={() => navigate(`/country/${c.name.common}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
