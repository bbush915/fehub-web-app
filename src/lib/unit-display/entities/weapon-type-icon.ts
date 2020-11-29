import { Texture } from "pixi.js";

import { Colors, Weapons } from "types";
import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

class WeaponTypeIcon extends BaseSprite {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_WEAPON_TYPE"];
  }

  render(context: Context): void {
    const hero = context.state.hero;

    const color = hero.color;
    const weapon = hero.weapon;

    this.view.texture = this._getTexture(color, weapon);
  }

  private _getTexture(color: Colors, weapon: Weapons): Texture {
    const colorName = Colors[color].toLowerCase();
    const weaponName = Weapons[weapon].toLowerCase();

    return getTexture(`2|weapon-type_${colorName}_${weaponName}`);
  }
}

export default WeaponTypeIcon;
