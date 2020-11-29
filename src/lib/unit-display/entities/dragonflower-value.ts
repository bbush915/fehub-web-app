import { Context, EntityProps, MessageTypes } from "../types";
import Number from "./number";

class DragonflowerValue extends Number {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_DRAGONFLOWERS"];
  }

  render(context: Context): void {
    const dragonflowers = context.state.statistics.dragonflowers;
    this.value = dragonflowers;

    super.render(context);
  }
}

export default DragonflowerValue;
