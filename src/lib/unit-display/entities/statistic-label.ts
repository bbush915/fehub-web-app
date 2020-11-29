import { Statistics } from "types";
import { Context, EntityProps, MessageTypes } from "../types";
import BaseText, { TextVariants } from "./base-text";

class StatisticLabel extends BaseText {
  private readonly _statistic: Statistics;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.statistic) {
      throw new Error("Missing required option: [statistic]");
    }

    this._statistic = props.options.statistic;

    this.view.text = this._getText();
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_ASSET", "SET_FLAW"];
  }

  render(context: Context): void {
    const asset = context.state.statistics.asset;
    const flaw = context.state.statistics.flaw;

    const variant = this._getVariant(asset, flaw);
    this.variant = variant;

    super.render(context);
  }

  private _getText(): string {
    switch (this._statistic) {
      case Statistics.HIT_POINTS: {
        return "HP";
      }

      case Statistics.ATTACK: {
        return "Atk";
      }

      case Statistics.SPEED: {
        return "Spd";
      }

      case Statistics.DEFENSE: {
        return "Def";
      }

      case Statistics.RESISTANCE: {
        return "Res";
      }

      default: {
        throw new Error(`Unexpected statistic encountered: [${this._statistic}]`);
      }
    }
  }

  private _getVariant(asset: Statistics, flaw: Statistics): TextVariants {
    let variant = TextVariants.WHITE;

    if (asset !== flaw) {
      if (asset === this._statistic) {
        variant = TextVariants.BLUE;
      }

      if (flaw === this._statistic) {
        variant = TextVariants.RED;
      }
    }

    return variant;
  }
}

export default StatisticLabel;
