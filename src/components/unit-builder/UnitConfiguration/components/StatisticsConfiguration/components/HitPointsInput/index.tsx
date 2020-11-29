import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import UnitBuilderContext from "../../../../../context";
import { hitPointsModifierState, hitPointsState, heroStatisticsState, overrideHitPointsState } from "../../../../state";
import StatisticInput from "../common/StatisticInput";

const HitPointsInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [hitPoints, setHitPoints] = useRecoilState(hitPointsState);
  const [overrideHitPoints, setOverrideHitPoints] = useRecoilState(overrideHitPointsState);
  const [hitPointsModifier, setHitPointsModifier] = useRecoilState(hitPointsModifierState);

  const heroStatistics = useRecoilValueLoadable(heroStatisticsState);

  const calculatedHitPoints = useMemo(_calculatedHitPoints, [overrideHitPoints, hitPoints, heroStatistics]);

  useEffect(_updateHitPoints, [overrideHitPoints, heroStatistics]);

  return (
    <StatisticInput
      label="Hit Points"
      value={calculatedHitPoints}
      onValueChange={_handleValueChange}
      overrideValue={overrideHitPoints}
      onOverrideValueChange={setOverrideHitPoints}
      modifier={hitPointsModifier}
      onModifierChange={_handleModifierChange}
    />
  );

  /* Internal */

  function _handleValueChange(value: number): void {
    dispatch({ type: "SET_HIT_POINTS", value });
    setHitPoints(value);
  }

  function _handleModifierChange(value: number): void {
    dispatch({ type: "SET_HIT_POINTS_MODIFIER", value });
    setHitPointsModifier(value);
  }

  /* Memos */

  function _calculatedHitPoints(): number {
    if (overrideHitPoints || heroStatistics.state !== "hasValue") {
      return hitPoints;
    }

    return heroStatistics.contents.hitPoints;
  }

  /* Effects */

  function _updateHitPoints(): void {
    if (overrideHitPoints || heroStatistics.state !== "hasValue") {
      return;
    }

    const value = heroStatistics.contents.hitPoints;

    dispatch({ type: "SET_HIT_POINTS", value });
    setHitPoints(value);
  }
};

export default HitPointsInput;
