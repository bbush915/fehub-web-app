import React, { useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { Enumeration } from "types";
import UnitBuilderContext from "../../../../../context";
import { blessingState, heroState } from "../../../../state";
import EnumerationSelect from "../../../common/EnumerationSelect";
import { fetchElements } from "./gql";

const BlessingSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [blessing, setBlessing] = useRecoilState(blessingState);

  const hero = useRecoilValue(heroState);

  const isLegendaryHero = hero?.isLegendaryHero ?? false;
  const isMythicHero = hero?.isMythicHero ?? false;

  const [elements, setElements] = useState<Enumeration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(_fetchElements, []);

  return (
    <EnumerationSelect
      disabled={loading || isLegendaryHero || isMythicHero}
      label="Blessing"
      onChange={_handleChange}
      options={elements}
      value={blessing}
    />
  );

  /* Internal */

  function _handleChange(value: number): void {
    dispatch({ type: "SET_BLESSING", value });
    setBlessing(value);
  }

  /* Effects */

  function _fetchElements(): void {
    (async function () {
      const elements = await fetchElements();
      setElements(elements);

      setLoading(false);
    })();
  }
};

export default BlessingSelect;
