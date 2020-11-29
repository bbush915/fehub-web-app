import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { SkillTypes } from "types";
import UnitBuilderContext from "../../../../../context";
import { heroSkillsState, overridePassiveBState, passiveBState, Skill } from "../../../../state";
import SkillSelect from "../common/SkillSelect";

const PassiveBSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [passiveB, setPassiveB] = useRecoilState(passiveBState);
  const [overridePassiveB, setOverridePassiveB] = useRecoilState(overridePassiveBState);

  const heroSkills = useRecoilValue(heroSkillsState);

  const calculatedPassiveB = useMemo(_calculatedPassiveB, [overridePassiveB, passiveB, heroSkills]);

  useEffect(_updatePassiveB, [overridePassiveB, heroSkills]);

  return (
    <SkillSelect
      id="passive-b-skill"
      label="Passive B"
      skillType={SkillTypes.PASSIVE_B}
      value={calculatedPassiveB}
      onValueChange={_handleValueChange}
      overrideValue={overridePassiveB}
      onOverrideValueChange={setOverridePassiveB}
    />
  );

  /* Internal */

  function _handleValueChange(value: Skill | null): void {
    dispatch({ type: "SET_PASSIVE_B", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setPassiveB(value);
  }

  /* Memos */

  function _calculatedPassiveB(): Skill | null {
    return overridePassiveB ? passiveB : heroSkills.passiveB;
  }

  /* Effects */

  function _updatePassiveB(): void {
    if (overridePassiveB) {
      return;
    }

    const value = heroSkills.passiveB;

    dispatch({ type: "SET_PASSIVE_B", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setPassiveB(value);
  }
};

export default PassiveBSelect;
