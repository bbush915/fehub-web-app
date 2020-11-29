import React, { useContext, useEffect, useState } from "react";

import { AllySupportRanks, Enumeration } from "types";
import UnitBuilderContext from "../../../../../context";
import EnumerationSelect from "../../../common/EnumerationSelect";
import { fetchAllySupportRanks } from "./gql";

const AllySupportSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [allySupportRanks, setAllySupportRanks] = useState<Enumeration[]>([]);
  const [loading, setLoading] = useState(true);
  const [allySupportRank, setAllySupportRank] = useState(AllySupportRanks.NONE);

  useEffect(_fetchAllySupportRanks, []);

  return (
    <EnumerationSelect
      disabled={loading}
      label="Ally Support"
      onChange={_handleChange}
      options={allySupportRanks}
      value={allySupportRank}
    />
  );

  /* Internal */

  function _handleChange(value: number): void {
    dispatch({ type: "SET_ALLY_SUPPORT_RANK", value });
    setAllySupportRank(value);
  }

  /* Effects */

  function _fetchAllySupportRanks(): void {
    (async function () {
      const allySupportRanks = await fetchAllySupportRanks();
      setAllySupportRanks(allySupportRanks);

      setLoading(false);
    })();
  }
};

export default AllySupportSelect;
