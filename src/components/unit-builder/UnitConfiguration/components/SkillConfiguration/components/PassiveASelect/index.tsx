import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { SkillTypes } from "types";
import UnitBuilderContext from "../../../../../context";
import { heroSkillsState, overridePassiveAState, passiveAState, Skill } from "../../../../state";
import SkillSelect from "../common/SkillSelect";

const PassiveASelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [passiveA, setPassiveA] = useRecoilState(passiveAState);
  const [overridePassiveA, setOverridePassiveA] = useRecoilState(overridePassiveAState);

  const heroSkills = useRecoilValue(heroSkillsState);

  const calculatedPassiveA = useMemo(_calculatedPassiveA, [overridePassiveA, passiveA, heroSkills]);

  useEffect(_updatePassiveA, [overridePassiveA, heroSkills]);

  return (
    <SkillSelect
      id="passive-a-skill"
      label="Passive A"
      skillType={SkillTypes.PASSIVE_A}
      value={calculatedPassiveA}
      onValueChange={_handleValueChange}
      overrideValue={overridePassiveA}
      onOverrideValueChange={setOverridePassiveA}
    />
  );

  /* Internal */

  function _handleValueChange(value: Skill | null): void {
    dispatch({ type: "SET_PASSIVE_A", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setPassiveA(value);
  }

  /* Memos */

  function _calculatedPassiveA(): Skill | null {
    return overridePassiveA ? passiveA : heroSkills.passiveA;
  }

  /* Effects */

  function _updatePassiveA(): void {
    if (overridePassiveA) {
      return;
    }

    const value = heroSkills.passiveA;

    dispatch({ type: "SET_PASSIVE_A", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setPassiveA(value);
  }
};

export default PassiveASelect;
