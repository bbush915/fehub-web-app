import React, { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { Enumeration } from "types";
import UnitBuilderContext from "../../../../../context";
import { assetState } from "../../../../state";
import EnumerationSelect from "../../../common/EnumerationSelect";
import { fetchStatistics } from "./gql";

const AssetSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [asset, setAsset] = useRecoilState(assetState);

  const [statistics, setStatistics] = useState<Enumeration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(_fetchStatistics, []);

  return (
    <EnumerationSelect disabled={loading} label="Asset" onChange={_handleChange} options={statistics} value={asset} />
  );

  /* Internal */

  function _handleChange(value: number): void {
    dispatch({ type: "SET_ASSET", value });
    setAsset(value);
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

export default AssetSelect;
