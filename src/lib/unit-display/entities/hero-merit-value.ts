import Constants from "utilities/constants";
import { Context, EntityProps, MessageTypes } from "../types";
import Number, { NumberVariants } from "./number";

class HeroMeritValue extends Number {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_HERO_MERIT"];
  }

  render(context: Context): void {
    const value = context.state.statistics.heroMerit;
    this.value = value;

    const variant = value === Constants.MAX_HERO_MERIT ? NumberVariants.GREEN : NumberVariants.YELLOW;
    this.variant = variant;

    super.render(context);
  }
}

export default HeroMeritValue;
