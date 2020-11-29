import { Texture } from "pixi.js";

import { SummonerSupportRanks } from "types";
import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Assets {
  BACKGROUND = "1|background",
  BACKGROUND_SUMMONER_SUPPORT = "1|background_summoner-support",
}

class Background extends BaseSprite {
  constructor(props: EntityProps) {
    super(props);

    this.view.texture = getTexture(Assets.BACKGROUND);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_SUMMONER_SUPPORT_RANK"];
  }

  render(context: Context): void {
    const summonerSupportRank = context.state.summonerSupportRank;
    this.view.texture = this._getTexture(summonerSupportRank);
  }

  private _getTexture(summonerSupportRank: SummonerSupportRanks): Texture {
    switch (summonerSupportRank) {
      case SummonerSupportRanks.NONE: {
        return getTexture(Assets.BACKGROUND);
      }

      case SummonerSupportRanks.C:
      case SummonerSupportRanks.B:
      case SummonerSupportRanks.A:
      case SummonerSupportRanks.S: {
        return getTexture(Assets.BACKGROUND_SUMMONER_SUPPORT);
      }

      default: {
        throw new Error(`Unexpected summoner support rank encountered: [${summonerSupportRank}]`);
      }
    }
  }
}

export default Background;
