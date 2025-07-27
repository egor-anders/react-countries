import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { Button } from "../components/Button";
import { Info } from "../components/Info";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearDetails,
  loadCountryByName,
} from "../store/details/details-actions";
import { selectDetails } from "../store/details/details-selectors";

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentCountry, err, status } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [name, dispatch]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>

      {status === "loading" && <h2>Loading...</h2>}
      {status === "rejected" && <h2>{err}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
