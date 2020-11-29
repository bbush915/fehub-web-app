import { Texture } from "pixi.js";

import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

class RarityIcon extends BaseSprite {
  private readonly _index: number;

  constructor(props: EntityProps) {
    super(props);

    if (props.options.index === undefined) {
      throw new Error("Missing required option: [index]");
    }

    this._index = props.options.index;
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_RARITY"];
  }

  render(context: Context): void {
    const rarity = context.state.statistics.rarity;

    this.view.texture = this._getTexture(rarity);
    this.view.visible = this._index < rarity;
  }

  private _getTexture(rarity: number): Texture {
    return getTexture(`2|rarity_${rarity}`);
  }
}

export default RarityIcon;
