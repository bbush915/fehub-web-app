import { Texture } from "pixi.js";

import { MovementTypes } from "types";
import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

class DragonflowerIcon extends BaseSprite {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_MOVEMENT_TYPE"];
  }

  render(context: Context): void {
    const movementType = context.state.hero.movementType;
    this.view.texture = this._getTexture(movementType);
  }

  private _getTexture(movementType: MovementTypes): Texture {
    const movementTypeName = MovementTypes[movementType].toLowerCase();
    return getTexture(`2|dragonflower_${movementTypeName}`);
  }
}

export default DragonflowerIcon;
