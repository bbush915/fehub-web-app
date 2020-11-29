import { Statistics } from "types";
import { Context, EntityProps, MessageTypes, State } from "../types";
import Number, { NumberVariants } from "./number";

class StatisticValue extends Number {
  private readonly _statistic: Statistics;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.statistic) {
      throw new Error("Missing required option: [statistic]");
    }

    this._statistic = props.options.statistic;
  }

  get subscriptions(): MessageTypes[] {
    return [
      "SET_ATTACK",
      "SET_ATTACK_MODIFIER",
      "SET_DEFENSE",
      "SET_DEFENSE_MODIFIER",
      "SET_HIT_POINTS",
      "SET_HIT_POINTS_MODIFIER",
      "SET_RESISTANCE",
      "SET_RESISTANCE_MODIFIER",
      "SET_SPEED",
      "SET_SPEED_MODIFIER",
    ];
  }

  render(context: Context): void {
    const value = this._getValue(context.state);
    this.value = value;

    const variant = this._getVariant(context.state);
    this.variant = variant;

    super.render(context);
  }

  private _getValue(state: State): number {
    let value = 0;

    switch (this._statistic) {
      case Statistics.HIT_POINTS: {
        value = state.statistics.hitPoints + state.statistics.hitPointsModifier;
        break;
      }

      case Statistics.ATTACK: {
        value = state.statistics.attack + state.statistics.attackModifier;
        break;
      }

      case Statistics.SPEED: {
        value = state.statistics.speed + state.statistics.speedModifier;
        break;
      }

      case Statistics.DEFENSE: {
        value = state.statistics.defense + state.statistics.defenseModifier;
        break;
      }

      case Statistics.RESISTANCE: {
        value = state.statistics.resistance + state.statistics.resistanceModifier;
        break;
      }

      default: {
        throw new Error(`Unexpected statistic encountered: [${this._statistic}]`);
      }
    }

    return Math.max(0, value);
  }

  private _getVariant(state: State): NumberVariants {
    let statisticModifier = 0;

    switch (this._statistic) {
      case Statistics.HIT_POINTS: {
        statisticModifier = state.statistics.hitPointsModifier;
        break;
      }

      case Statistics.ATTACK: {
        statisticModifier = state.statistics.attackModifier;
        break;
      }

      case Statistics.SPEED: {
        statisticModifier = state.statistics.speedModifier;
        break;
      }

      case Statistics.DEFENSE: {
        statisticModifier = state.statistics.defenseModifier;
        break;
      }

      case Statistics.RESISTANCE: {
        statisticModifier = state.statistics.resistanceModifier;
        break;
      }

      default: {
        throw new Error(`Unexpected statistic encountered: [${this._statistic}]`);
      }
    }

    let variant = NumberVariants.YELLOW;

    if (statisticModifier > 0) {
      variant = NumberVariants.BLUE;
    }

    if (statisticModifier < 0) {
      variant = NumberVariants.RED;
    }

    return variant;
  }
}

export default StatisticValue;
