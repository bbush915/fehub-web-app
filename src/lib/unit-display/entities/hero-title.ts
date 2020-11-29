import { Context, EntityProps, MessageTypes } from "../types";
import BaseText from "./base-text";

class HeroName extends BaseText {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_HERO_TITLE"];
  }

  render(context: Context): void {
    const title = context.state.hero.title;
    this.view.text = title;
  }
}

export default HeroName;
