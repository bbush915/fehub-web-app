import React, { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { Enumeration } from "types";
import UnitBuilderContext from "../../../../../context";
import { summonerSupportRankState } from "../../../../state";
import EnumerationSelect from "../../../common/EnumerationSelect";
import { fetchSummonerSupportRanks } from "./gql";

const SummonerSupportSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [summonerSupportRank, setSummonerSupportRank] = useRecoilState(summonerSupportRankState);

  const [summonerSupportRanks, setSummonerSupportRanks] = useState<Enumeration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(_fetchSummonerSupportRanks, []);

  return (
    <EnumerationSelect
      disabled={loading}
      label="Summoner Support"
      onChange={_handleChange}
      options={summonerSupportRanks}
      value={summonerSupportRank}
    />
  );

  /* Internal */

  function _handleChange(value: number): void {
    dispatch({ type: "SET_SUMMONER_SUPPORT_RANK", value });
    setSummonerSupportRank(value);
  }

  /* Effects */

  function _fetchSummonerSupportRanks(): void {
    (async function () {
      const summonerSupportRanks = await fetchSummonerSupportRanks();
      setSummonerSupportRanks(summonerSupportRanks);

      setLoading(false);
    })();
  }
};

export default SummonerSupportSelect;
