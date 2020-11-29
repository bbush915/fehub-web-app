import { Context, EntityProps } from "../types";
import BaseContainer from "./base-container";

export enum StackDirections {
  ROW = "row",
  ROW_REVERSE = "row-reverse",
}

class StackContainer extends BaseContainer {
  private readonly _direction: StackDirections;
  private readonly _spacing: number;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.direction) {
      throw new Error("Missing required option: [direction]");
    }

    this._direction = props.options.direction;

    if (props.options.spacing === undefined) {
      throw new Error("Missing required option: [spacing]");
    }

    this._spacing = props.options.spacing;
  }

  get alwaysRender(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_context: Context): void {
    const visibleChildren = this.children.map((x) => x.view).filter((x) => x.visible);

    if (visibleChildren.length === 0) {
      return;
    }

    const baseChild = visibleChildren[0];

    let currentX = this._direction === StackDirections.ROW_REVERSE ? -baseChild.width : 0;

    baseChild.position.set(currentX, baseChild.position.y);

    for (let i = 1; i < visibleChildren.length; i++) {
      const child = visibleChildren[i];

      switch (this._direction) {
        case StackDirections.ROW: {
          currentX += this._spacing + visibleChildren[i - 1].width;
          break;
        }

        case StackDirections.ROW_REVERSE: {
          currentX -= this._spacing + child.width;
          break;
        }

        default: {
          throw new Error(`Unexpected stack direction encountered: [${this._direction}]`);
        }
      }

      child.position.set(currentX, child.position.y);
    }
  }
}

export default StackContainer;
