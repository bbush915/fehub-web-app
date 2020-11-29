import { Texture } from "pixi.js";

import { AllySupportRanks, Elements, SummonerSupportRanks } from "types";
import { Context, EntityProps, Layout, MessageTypes, State } from "../types";
import { applyAdjustment, applyDefaultLayout } from "../utilities/layout-helpers";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Adjustments {
  BADGES_3_SLOT_1 = "badges-3_slot-1",
  BADGES_4_SLOT_1 = "badges-4_slot-1",
}

class BlessingBadge extends BaseSprite {
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
    const element = context.state.blessing;

    this.view.texture = this._getTexture(element);
    this.view.visible = element !== Elements.NONE;

    if (this.view.visible) {
      const adjustment = this._getAdjustment(context.state);

      if (adjustment) {
        applyAdjustment(this.view, this._layout, adjustment);
      } else {
        applyDefaultLayout(this.view, this._layout);
      }
    }
  }

  private _getTexture(element: Elements): Texture {
    const elementName = Elements[element].toLowerCase();
    return getTexture(`2|badge_blessing_${elementName}`);
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
      case 3: {
        return Adjustments.BADGES_3_SLOT_1;
      }

      case 4: {
        return Adjustments.BADGES_4_SLOT_1;
      }

      default: {
        return null;
      }
    }
  }
}

export default BlessingBadge;
