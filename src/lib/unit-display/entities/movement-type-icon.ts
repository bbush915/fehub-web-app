import { Texture } from "pixi.js";

import { AccessoryTypes, MovementTypes } from "types";
import { Context, EntityProps, Layout, MessageTypes, State } from "../types";
import { applyAdjustment, applyDefaultLayout } from "../utilities/layout-helpers";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Adjustments {
  ACCESSORY = "accessory",
}

class MovementTypeIcon extends BaseSprite {
  private readonly _layout: Layout;

  constructor(props: EntityProps) {
    super(props);

    this._layout = props.layout;

    this.view.visible = false;
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_ACCESSORY_TYPE", "SET_MOVEMENT_TYPE"];
  }

  render(context: Context): void {
    const movementType = context.state.hero.movementType;

    this.view.texture = this._getTexture(movementType);
    this.view.visible = movementType !== MovementTypes.NONE;

    if (this.view.visible) {
      const adjustment = this._getAdjustment(context.state);

      if (adjustment) {
        applyAdjustment(this.view, this._layout, adjustment);
      } else {
        applyDefaultLayout(this.view, this._layout);
      }
    }
  }

  private _getTexture(movementType: MovementTypes): Texture {
    const movementTypeName = MovementTypes[movementType].toLowerCase();
    return getTexture(`2|movement-type_${movementTypeName}`);
  }

  private _getAdjustment(state: State): Adjustments | null {
    return state.accessoryType === AccessoryTypes.NONE ? null : Adjustments.ACCESSORY;
  }
}

export default MovementTypeIcon;
