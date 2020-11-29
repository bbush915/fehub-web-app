import { Texture } from "pixi.js";

import { AccessoryTypes } from "types";
import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

class AccessoryTypeIcon extends BaseSprite {
  constructor(props: EntityProps) {
    super(props);

    this.view.visible = false;
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_ACCESSORY_TYPE"];
  }

  render(context: Context): void {
    const accessoryType = context.state.accessoryType;

    this.view.texture = this._getTexture(accessoryType);
    this.view.visible = accessoryType !== AccessoryTypes.NONE;
  }

  private _getTexture(accessoryType: AccessoryTypes): Texture {
    const accessoryTypeName = AccessoryTypes[accessoryType].toLowerCase();
    return getTexture(`2|accessory-type_${accessoryTypeName}`);
  }
}

export default AccessoryTypeIcon;
