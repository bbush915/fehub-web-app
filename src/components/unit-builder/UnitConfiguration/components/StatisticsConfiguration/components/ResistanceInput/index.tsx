import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import UnitBuilderContext from "../../../../../context";
import {
  resistanceModifierState,
  resistanceState,
  heroStatisticsState,
  overrideResistanceState,
} from "../../../../state";
import StatisticInput from "../common/StatisticInput";

const ResistanceInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [resistance, setResistance] = useRecoilState(resistanceState);
  const [overrideResistance, setOverrideResistance] = useRecoilState(overrideResistanceState);
  const [resistanceModifier, setResistanceModifier] = useRecoilState(resistanceModifierState);

  const heroStatistics = useRecoilValueLoadable(heroStatisticsState);

  const calculatedResistance = useMemo(_calculatedResistance, [overrideResistance, resistance, heroStatistics]);

  useEffect(_updateResistance, [overrideResistance, heroStatistics]);

  return (
    <StatisticInput
      label="Resistance"
      value={calculatedResistance}
      onValueChange={_handleValueChange}
      overrideValue={overrideResistance}
      onOverrideValueChange={setOverrideResistance}
      modifier={resistanceModifier}
      onModifierChange={_handleModifierChange}
    />
  );

  /* Internal */

  function _handleValueChange(value: number): void {
    dispatch({ type: "SET_RESISTANCE", value });
    setResistance(value);
  }

  function _handleModifierChange(value: number): void {
    dispatch({ type: "SET_RESISTANCE_MODIFIER", value });
    setResistanceModifier(value);
  }

  /* Memos */

  function _calculatedResistance(): number {
    if (overrideResistance || heroStatistics.state !== "hasValue") {
      return resistance;
    }

    return heroStatistics.contents.resistance;
  }

  /* Effects */

  function _updateResistance(): void {
    if (overrideResistance || heroStatistics.state !== "hasValue") {
      return;
    }

    const value = heroStatistics.contents.resistance;

    dispatch({ type: "SET_RESISTANCE", value });
    setResistance(value);
  }
};

export default ResistanceInput;
