import { Context, EntityProps, MessageTypes } from "../types";
import BaseContainer from "./base-container";

class DragonflowerContainer extends BaseContainer {
  constructor(props: EntityProps) {
    super(props);

    this.view.visible = false;
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_DRAGONFLOWERS"];
  }

  render(context: Context): void {
    const dragonflowers = context.state.statistics.dragonflowers;
    this.view.visible = dragonflowers > 0;
  }
}

export default DragonflowerContainer;
