import Constants from "utilities/constants";
import { Context, EntityProps, MessageTypes } from "../types";
import Number, { NumberVariants } from "./number";

class MergeValue extends Number {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_MERGES"];
  }

  render(context: Context): void {
    const merges = context.state.statistics.merges;
    this.value = merges;

    if (this.value === 0) {
      this.view.visible = false;
    } else {
      const variant = this.value === Constants.MAX_MERGES ? NumberVariants.GREEN : NumberVariants.WHITE;

      this.variant = variant;

      this.view.visible = true;
    }

    super.render(context);
  }
}

export default MergeValue;
