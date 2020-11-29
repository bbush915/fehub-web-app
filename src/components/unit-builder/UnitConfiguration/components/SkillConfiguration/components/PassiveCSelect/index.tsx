import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { SkillTypes } from "types";
import UnitBuilderContext from "../../../../../context";
import { heroSkillsState, overridePassiveCState, passiveCState, Skill } from "../../../../state";
import SkillSelect from "../common/SkillSelect";

const PassiveCSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [passiveC, setPassiveC] = useRecoilState(passiveCState);
  const [overridePassiveC, setOverridePassiveC] = useRecoilState(overridePassiveCState);

  const heroSkills = useRecoilValue(heroSkillsState);

  const calculatedPassiveC = useMemo(_calculatedPassiveC, [overridePassiveC, passiveC, heroSkills]);

  useEffect(_updatePassiveC, [overridePassiveC, heroSkills]);

  return (
    <SkillSelect
      id="passive-c-skill"
      label="Passive C"
      skillType={SkillTypes.PASSIVE_C}
      value={calculatedPassiveC}
      onValueChange={_handleValueChange}
      overrideValue={overridePassiveC}
      onOverrideValueChange={setOverridePassiveC}
    />
  );

  /* Internal */

  function _handleValueChange(value: Skill | null): void {
    dispatch({ type: "SET_PASSIVE_C", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setPassiveC(value);
  }

  /* Memos */

  function _calculatedPassiveC(): Skill | null {
    return overridePassiveC ? passiveC : heroSkills.passiveC;
  }

  /* Effects */

  function _updatePassiveC(): void {
    if (overridePassiveC) {
      return;
    }

    const value = heroSkills.passiveC;

    dispatch({ type: "SET_PASSIVE_C", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setPassiveC(value);
  }
};

export default PassiveCSelect;
