import React, { useContext } from "react";
import { useRecoilState } from "recoil";

import { SkillTypes } from "types";
import UnitBuilderContext from "../../../../../context";
import { sacredSealState, Skill } from "../../../../state";
import SkillSelect from "../common/SkillSelect";

const SacredSealSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [sacredSeal, setSacredSeal] = useRecoilState(sacredSealState);

  return (
    <SkillSelect
      id="sacred-seal-skill"
      label="Sacred Seal"
      skillType={SkillTypes.SACRED_SEAL}
      value={sacredSeal}
      onValueChange={_handleValueChange}
      hideOverride
    />
  );

  /* Internal */

  function _handleValueChange(value: Skill | null): void {
    dispatch({ type: "SET_SACRED_SEAL", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setSacredSeal(value);
  }
};

export default SacredSealSelect;
