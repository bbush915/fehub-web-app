import { Context, EntityProps, MessageTypes } from "../types";
import BaseText from "./base-text";

class Artist extends BaseText {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_ARTIST"];
  }

  render(context: Context): void {
    const artist = context.state.hero.artist;
    this.view.text = artist;
  }
}

export default Artist;
