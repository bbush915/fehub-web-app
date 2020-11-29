import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { SkillTypes } from "types";
import UnitBuilderContext from "../../../../../context";
import { assistState, heroSkillsState, overrideAssistState, Skill } from "../../../../state";
import SkillSelect from "../common/SkillSelect";

const AssistSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [assist, setAssist] = useRecoilState(assistState);
  const [overrideAssist, setOverrideAssist] = useRecoilState(overrideAssistState);

  const heroSkills = useRecoilValue(heroSkillsState);

  const calculatedAssist = useMemo(_calculatedAssist, [overrideAssist, assist, heroSkills]);

  useEffect(_updateAssist, [overrideAssist, heroSkills]);

  return (
    <SkillSelect
      id="assist-skill"
      label="Assist"
      skillType={SkillTypes.ASSIST}
      value={calculatedAssist}
      onValueChange={_handleValueChange}
      overrideValue={overrideAssist}
      onOverrideValueChange={setOverrideAssist}
    />
  );

  /* Internal */

  function _handleValueChange(value: Skill | null): void {
    dispatch({ type: "SET_ASSIST", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setAssist(value);
  }

  /* Memos */

  function _calculatedAssist(): Skill | null {
    return overrideAssist ? assist : heroSkills.assist;
  }

  /* Effects */

  function _updateAssist(): void {
    if (overrideAssist) {
      return;
    }

    const value = heroSkills.assist;

    dispatch({ type: "SET_ASSIST", value: { id: value?.id ?? null, name: value?.name ?? "" } });
    setAssist(value);
  }
};

export default AssistSelect;
