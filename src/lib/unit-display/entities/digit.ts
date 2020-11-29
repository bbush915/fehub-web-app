import { Texture } from "pixi.js";

import { Context, EntityProps } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";
import { NumberVariants } from "./number";

class Digit extends BaseSprite {
  private _value: string;
  private _variant: NumberVariants;

  constructor(props: EntityProps) {
    super(props);

    this._value = "0";

    if (!props.options.variant) {
      throw new Error("Missing required option: [variant]");
    }

    this._variant = props.options.variant;

    this.view.texture = this._getTexture(this._value, this._variant);
  }

  set value(value: string) {
    this._value = value;
  }

  set variant(variant: NumberVariants) {
    this._variant = variant;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_context: Context): void {
    this.view.texture = this._getTexture(this._value, this._variant);
  }

  private _getTexture(value: string, variant: NumberVariants): Texture {
    return getTexture(`2|digit_${value}_${variant}`);
  }
}

export default Digit;
