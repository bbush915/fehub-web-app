import { Texture } from "pixi.js";

import { Context, EntityProps, MessageTypes } from "../types";
import { getAssetUrl, getDefaultTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

class Hero extends BaseSprite {
  private readonly _defaultTexture: Texture;

  constructor(props: EntityProps) {
    super(props);

    this._defaultTexture = getDefaultTexture();
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_HERO_ID"];
  }

  render(context: Context): void {
    const heroId = context.state.hero.id;
    this.view.texture = this._getTexture(heroId);
  }

  private _getTexture(heroId: string | null): Texture {
    return heroId ? Texture.from(getAssetUrl(`heroes/${heroId}/default.png`)) : this._defaultTexture;
  }
}

export default Hero;
