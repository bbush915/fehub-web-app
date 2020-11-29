import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { SkillTypes } from "types";
import UnitBuilderContext from "../../../../../context";
import { heroSkillsState, overrideSpecialState, Skill, specialState } from "../../../../state";
import SkillSelect from "../common/SkillSelect";

const SpecialSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [special, setSpecial] = useRecoilState(specialState);
  const [overrideSpecial, setOverrideSpecial] = useRecoilState(overrideSpecialState);

  const heroSkills = useRecoilValue(heroSkillsState);

  const calculatedSpecial = useMemo(_calculatedSpecial, [overrideSpecial, special, heroSkills]);

  useEffect(_updateSpecial, [overrideSpecial, heroSkills]);

  return (
    <SkillSelect
      id="special-skill"
      label="Special"
      skillType={SkillTypes.SPECIAL}
      value={calculatedSpecial}
      onValueChange={_handleValueChange}
      overrideValue={overrideSpecial}
      onOverrideValueChange={setOverrideSpecial}
    />
  );

  /* Internal */

  function _handleValueChange(value: Skill | null): void {
    dispatch({ type: "SET_SPECIAL", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setSpecial(value);
  }

  /* Memos */

  function _calculatedSpecial(): Skill | null {
    return overrideSpecial ? special : heroSkills.special;
  }

  /* Effects */

  function _updateSpecial(): void {
    if (overrideSpecial) {
      return;
    }

    const value = heroSkills.special;

    dispatch({ type: "SET_SPECIAL", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setSpecial(value);
  }
};

export default SpecialSelect;
