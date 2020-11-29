import React, { useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { Enumeration } from "types";
import UnitBuilderContext from "../../../../../context";
import { flawState, mergesState } from "../../../../state";
import EnumerationSelect from "../../../common/EnumerationSelect";
import { fetchStatistics } from "./gql";

const FlawSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [flaw, setFlaw] = useRecoilState(flawState);
  const merges = useRecoilValue(mergesState);

  const [statistics, setStatistics] = useState<Enumeration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(_fetchStatistics, []);

  return (
    <EnumerationSelect
      disabled={loading || merges > 0}
      label="Flaw"
      onChange={_handleChange}
      options={statistics}
      value={flaw}
    />
  );

  /* Internal */

  function _handleChange(value: number): void {
    dispatch({ type: "SET_FLAW", value });
    setFlaw(value);
  }

  /* Effects */

  function _fetchStatistics(): void {
    (async function () {
      const statistics = await fetchStatistics();
      setStatistics(statistics);

      setLoading(false);
    })();
  }
};

export default FlawSelect;
