import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setSelectedState } from "../store/covidSlice";

const StateSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { data, selectedState } = useSelector(
    (state: RootState) => state?.covid
  );
  const states = ["All States", ...data?.map((item) => item?.state)];

  return (
    <div className="select-container">
      <select
        className="state-selector"
        value={selectedState}
        onChange={(e) => dispatch(setSelectedState(e.target.value))}
      >
        {states?.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateSelector;
