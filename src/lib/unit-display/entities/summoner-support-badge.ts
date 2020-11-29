import { Texture } from "pixi.js";

import { AllySupportRanks, SummonerSupportRanks } from "types";
import { Context, EntityProps, Layout, MessageTypes, State } from "../types";
import { applyAdjustment, applyDefaultLayout } from "../utilities/layout-helpers";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Adjustments {
  BADGES_2_SLOT_2 = "badges-2_slot-2",
  BADGES_3_SLOT_3 = "badges-3_slot-3",
  BADGES_4_SLOT_4 = "badges-4_slot-4",
}

class SummonerSupportBadge extends BaseSprite {
  private readonly _layout: Layout;

  constructor(props: EntityProps) {
    super(props);

    this._layout = props.layout;

    this.view.visible = false;
  }

  get subscriptions(): MessageTypes[] {
    return [
      "SET_ALLY_SUPPORT_RANK",
      "SET_BLESSING",
      "SET_DUO_HERO",
      "SET_LEGENDARY_HERO",
      "SET_MYTHIC_HERO",
      "SET_SUMMONER_SUPPORT_RANK",
    ];
  }

  render(context: Context): void {
    const summonerSupportRank = context.state.summonerSupportRank;

    this.view.texture = this._getTexture(summonerSupportRank);
    this.view.visible = summonerSupportRank !== SummonerSupportRanks.NONE;

    if (this.view.visible) {
      const adjustment = this._getAdjustment(context.state);

      if (adjustment) {
        applyAdjustment(this.view, this._layout, adjustment);
      } else {
        applyDefaultLayout(this.view, this._layout);
      }
    }
  }

  private _getTexture(summonerSupportRank: SummonerSupportRanks): Texture {
    const summonerSupportRankName = SummonerSupportRanks[summonerSupportRank].toLowerCase();
    return getTexture(`2|badge_summoner-support_${summonerSupportRankName}`);
  }

  private _getAdjustment(state: State): Adjustments | null {
    const badgeVisibilities = [
      state.summonerSupportRank !== SummonerSupportRanks.NONE,
      state.allySupportRank !== AllySupportRanks.NONE,
      state.hero.isDuoHero,
      state.blessing || state.hero.isLegendaryHero || state.hero.isMythicHero,
    ];

    const badgeVisibilityCount = badgeVisibilities.filter((x) => x).length;

    switch (badgeVisibilityCount) {
      case 2: {
        return Adjustments.BADGES_2_SLOT_2;
      }

      case 3: {
        return Adjustments.BADGES_3_SLOT_3;
      }

      case 4: {
        return Adjustments.BADGES_4_SLOT_4;
      }

      default: {
        return null;
      }
    }
  }
}

export default SummonerSupportBadge;
