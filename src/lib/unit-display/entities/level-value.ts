import { Context, EntityProps, MessageTypes } from "../types";
import Number from "./number";

class LevelValue extends Number {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_LEVEL"];
  }

  render(context: Context): void {
    const level = context.state.statistics.level;
    this.value = level;

    super.render(context);
  }
}

export default LevelValue;
