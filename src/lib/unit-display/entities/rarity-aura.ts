import { Context, EntityProps } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Assets {
  AURA = "2|rarity-aura",
}

class RarityAura extends BaseSprite {
  private _timer: number;

  constructor(props: EntityProps) {
    super(props);

    this._timer = 0;

    this.view.texture = getTexture(Assets.AURA);
  }

  get alwaysRender(): boolean {
    return true;
  }

  render(context: Context): void {
    const rarity = context.state.statistics.rarity;

    if (rarity < 5) {
      this.view.visible = false;
      return;
    }

    this.view.visible = true;

    this.view.rotation -= 0.0025;
    this.view.alpha = 0.625 + 0.125 * Math.cos(this._timer);

    this._timer += 0.05;
  }
}

export default RarityAura;
