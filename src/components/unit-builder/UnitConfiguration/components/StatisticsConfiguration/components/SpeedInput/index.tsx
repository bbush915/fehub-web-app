import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import UnitBuilderContext from "../../../../../context";
import { speedModifierState, speedState, heroStatisticsState, overrideSpeedState } from "../../../../state";
import StatisticInput from "../common/StatisticInput";

const SpeedInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [speed, setSpeed] = useRecoilState(speedState);
  const [overrideSpeed, setOverrideSpeed] = useRecoilState(overrideSpeedState);
  const [speedModifier, setSpeedModifier] = useRecoilState(speedModifierState);

  const heroStatistics = useRecoilValueLoadable(heroStatisticsState);

  const calculatedSpeed = useMemo(_calculatedSpeed, [overrideSpeed, speed, heroStatistics]);

  useEffect(_updateSpeed, [overrideSpeed, heroStatistics]);

  return (
    <StatisticInput
      label="Speed"
      value={calculatedSpeed}
      onValueChange={_handleValueChange}
      overrideValue={overrideSpeed}
      onOverrideValueChange={setOverrideSpeed}
      modifier={speedModifier}
      onModifierChange={_handleModifierChange}
    />
  );

  /* Internal */

  function _handleValueChange(value: number): void {
    dispatch({ type: "SET_SPEED", value });
    setSpeed(value);
  }

  function _handleModifierChange(value: number): void {
    dispatch({ type: "SET_SPEED_MODIFIER", value });
    setSpeedModifier(value);
  }

  /* Memos */

  function _calculatedSpeed(): number {
    if (overrideSpeed || heroStatistics.state !== "hasValue") {
      return speed;
    }

    return heroStatistics.contents.speed;
  }

  /* Effects */

  function _updateSpeed(): void {
    if (overrideSpeed || heroStatistics.state !== "hasValue") {
      return;
    }

    const value = heroStatistics.contents.speed;

    dispatch({ type: "SET_SPEED", value });
    setSpeed(value);
  }
};

export default SpeedInput;
