import { Context, EntityProps, MessageTypes } from "../types";
import BaseText from "./base-text";

class HeroName extends BaseText {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_HERO_NAME"];
  }

  render(context: Context): void {
    const name = context.state.hero.name;
    this.view.text = name;
  }
}

export default HeroName;
