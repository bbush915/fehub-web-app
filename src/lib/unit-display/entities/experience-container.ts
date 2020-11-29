import Constants from "utilities/constants";
import { Context, EntityProps, IEntity, MessageTypes } from "../types";
import BaseContainer from "./base-container";

class ExperienceContainer extends BaseContainer {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_LEVEL"];
  }

  render(context: Context): void {
    const isMaxLevel = context.state.statistics.level === Constants.MAX_LEVEL;

    const maxLevelChild = this._getChildByTag("max-level");
    maxLevelChild.view.visible = isMaxLevel;

    const subMaxLevelChild = this._getChildByTag("sub-max-level");
    subMaxLevelChild.view.visible = !isMaxLevel;

    super.render(context);
  }

  private _getChildByTag(tag: string): IEntity {
    const child = this.children.find((x) => x.tags.includes(tag));

    if (!child) {
      throw new Error(`Unable to locate child with tag: [${tag}]`);
    }

    return child;
  }
}

export default ExperienceContainer;
