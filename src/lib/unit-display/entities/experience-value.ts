import { Context, EntityProps, MessageTypes } from "../types";
import Number from "./number";

class ExperienceValue extends Number {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_LEVEL"];
  }

  render(context: Context): void {
    const level = context.state.statistics.level;

    const experience = Math.floor(Math.pow(1.1, level - 1) * 100);
    this.value = experience;

    super.render(context);
  }
}

export default ExperienceValue;
