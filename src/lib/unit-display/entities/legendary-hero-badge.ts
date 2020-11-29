import { Texture } from "pixi.js";

import { AllySupportRanks, Elements, LegendaryHeroBoostTypes, SummonerSupportRanks } from "types";
import { Context, EntityProps, Layout, MessageTypes, State } from "../types";
import { applyAdjustment, applyDefaultLayout } from "../utilities/layout-helpers";
import { getDefaultTexture, getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Adjustments {
  BADGES_3_SLOT_1 = "badges-3_slot-1",
  BADGES_4_SLOT_1 = "badges-4_slot-1",
}

class LegendaryHeroBadge extends BaseSprite {
  private readonly _layout: Layout;
  private readonly _defaultTexture: Texture;

  constructor(props: EntityProps) {
    super(props);

    this._layout = props.layout;

    this._defaultTexture = getDefaultTexture();

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
    const hero = context.state.hero;

    this.view.texture = this._getTexture(hero);
    this.view.visible = hero.isLegendaryHero;

    if (this.view.visible) {
      const adjustment = this._getAdjustment(context.state);

      if (adjustment) {
        applyAdjustment(this.view, this._layout, adjustment);
      } else {
        applyDefaultLayout(this.view, this._layout);
      }
    }
  }

  private _getTexture(hero: State["hero"]): Texture {
    if (!hero.isLegendaryHero) {
      return this._defaultTexture;
    }

    const elementName = Elements[hero.element].toLowerCase();
    const legendaryHeroBoostTypeName = LegendaryHeroBoostTypes[hero.legendaryHeroBoostType]
      .replace("_", "-")
      .toLowerCase();

    return getTexture(`2|badge_legendary_${elementName}_${legendaryHeroBoostTypeName}`);
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

export default LegendaryHeroBadge;
