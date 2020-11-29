import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import UnitBuilderContext from "../../../../../context";
import { defenseModifierState, defenseState, heroStatisticsState, overrideDefenseState } from "../../../../state";
import StatisticInput from "../common/StatisticInput";

const DefenseInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [defense, setDefense] = useRecoilState(defenseState);
  const [overrideDefense, setOverrideDefense] = useRecoilState(overrideDefenseState);
  const [defenseModifier, setDefenseModifier] = useRecoilState(defenseModifierState);

  const heroStatistics = useRecoilValueLoadable(heroStatisticsState);

  const calculatedDefense = useMemo(_calculatedDefense, [overrideDefense, defense, heroStatistics]);

  useEffect(_updateDefense, [overrideDefense, heroStatistics]);

  return (
    <StatisticInput
      label="Defense"
      value={calculatedDefense}
      onValueChange={_handleValueChange}
      overrideValue={overrideDefense}
      onOverrideValueChange={setOverrideDefense}
      modifier={defenseModifier}
      onModifierChange={_handleModifierChange}
    />
  );

  /* Internal */

  function _handleValueChange(value: number): void {
    dispatch({ type: "SET_DEFENSE", value });
    setDefense(value);
  }

  function _handleModifierChange(value: number): void {
    dispatch({ type: "SET_DEFENSE_MODIFIER", value });
    setDefenseModifier(value);
  }

  /* Memos */

  function _calculatedDefense(): number {
    if (overrideDefense || heroStatistics.state !== "hasValue") {
      return defense;
    }

    return heroStatistics.contents.defense;
  }

  /* Effects */

  function _updateDefense(): void {
    if (overrideDefense || heroStatistics.state !== "hasValue") {
      return;
    }

    const value = heroStatistics.contents.defense;

    dispatch({ type: "SET_DEFENSE", value });
    setDefense(value);
  }
};

export default DefenseInput;
