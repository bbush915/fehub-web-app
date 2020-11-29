import Constants from "utilities/constants";
import { Context, EntityProps, MessageTypes } from "../types";
import Number, { NumberVariants } from "./number";

class SkillPointsValue extends Number {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_SKILL_POINTS"];
  }

  render(context: Context): void {
    const value = context.state.statistics.skillPoints;
    this.value = value;

    const variant = value === Constants.MAX_SKILL_POINTS ? NumberVariants.GREEN : NumberVariants.YELLOW;
    this.variant = variant;

    super.render(context);
  }
}

export default SkillPointsValue;
