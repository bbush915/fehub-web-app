import React, { useContext, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import UnitBuilderContext from "../../../../../context";
import { attackModifierState, attackState, heroStatisticsState, overrideAttackState } from "../../../../state";
import StatisticInput from "../common/StatisticInput";

const AttackInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [attack, setAttack] = useRecoilState(attackState);
  const [overrideAttack, setOverrideAttack] = useRecoilState(overrideAttackState);
  const [attackModifier, setAttackModifier] = useRecoilState(attackModifierState);

  const heroStatistics = useRecoilValueLoadable(heroStatisticsState);

  const calculatedAttack = useMemo(_calculatedAttack, [overrideAttack, attack, heroStatistics]);

  useEffect(_updateAttack, [overrideAttack, heroStatistics]);

  return (
    <StatisticInput
      label="Attack"
      value={calculatedAttack}
      onValueChange={_handleValueChange}
      overrideValue={overrideAttack}
      onOverrideValueChange={setOverrideAttack}
      modifier={attackModifier}
      onModifierChange={_handleModifierChange}
    />
  );

  /* Internal */

  function _handleValueChange(value: number): void {
    dispatch({ type: "SET_ATTACK", value });
    setAttack(value);
  }

  function _handleModifierChange(value: number): void {
    dispatch({ type: "SET_ATTACK_MODIFIER", value });
    setAttackModifier(value);
  }

  /* Memos */

  function _calculatedAttack(): number {
    if (overrideAttack || heroStatistics.state !== "hasValue") {
      return attack;
    }

    return heroStatistics.contents.attack;
  }

  /* Effects */

  function _updateAttack(): void {
    if (overrideAttack || heroStatistics.state !== "hasValue") {
      return;
    }

    const value = heroStatistics.contents.attack;

    dispatch({ type: "SET_ATTACK", value });
    setAttack(value);
  }
};

export default AttackInput;
