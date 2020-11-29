import { atom } from "recoil";

import { Elements, Statistics, SummonerSupportRanks } from "types";
import Constants from "utilities/constants";
import { Hero, Skill } from "./types";

export const blessingState = atom<Elements>({
  key: "blessing",
  default: Elements.NONE,
});

export const heroState = atom<Hero | null>({
  key: "hero",
  default: null,
});

export const summonerSupportRankState = atom<SummonerSupportRanks>({
  key: "summonerSupportRank",
  default: SummonerSupportRanks.NONE,
});

export const rarityState = atom<number>({
  key: "rarity",
  default: Constants.MAX_RARITY,
});

export const levelState = atom<number>({
  key: "level",
  default: Constants.MAX_LEVEL,
});

export const mergesState = atom<number>({
  key: "merges",
  default: 0,
});

export const dragonflowersState = atom<number>({
  key: "dragonflowers",
  default: 0,
});

export const assetState = atom<Statistics>({
  key: "asset",
  default: Statistics.NONE,
});

export const flawState = atom<Statistics>({
  key: "flaw",
  default: Statistics.NONE,
});

export const hitPointsState = atom<number>({
  key: "hitPoints",
  default: 0,
});

export const overrideHitPointsState = atom<boolean>({
  key: "overrideHitPoints",
  default: false,
});

export const hitPointsModifierState = atom<number>({
  key: "hitPointsModifier",
  default: 0,
});

export const attackState = atom<number>({
  key: "attack",
  default: 0,
});

export const overrideAttackState = atom<boolean>({
  key: "overrideAttack",
  default: false,
});

export const attackModifierState = atom<number>({
  key: "attackModifier",
  default: 0,
});

export const speedState = atom<number>({
  key: "speed",
  default: 0,
});

export const overrideSpeedState = atom<boolean>({
  key: "overrideSpeed",
  default: false,
});

export const speedModifierState = atom<number>({
  key: "speedModifier",
  default: 0,
});

export const defenseState = atom<number>({
  key: "defense",
  default: 0,
});

export const overrideDefenseState = atom<boolean>({
  key: "overrideDefense",
  default: false,
});

export const defenseModifierState = atom<number>({
  key: "defenseModifier",
  default: 0,
});

export const resistanceState = atom<number>({
  key: "resistance",
  default: 0,
});

export const overrideResistanceState = atom<boolean>({
  key: "overrideResistance",
  default: false,
});

export const resistanceModifierState = atom<number>({
  key: "resistanceModifier",
  default: 0,
});

export const includeSkillBonusesState = atom<boolean>({
  key: "includeSkillBonuses",
  default: true,
});

export const weaponState = atom<Skill | null>({
  key: "weapon",
  default: null,
});

export const overrideWeaponState = atom<boolean>({
  key: "overrideWeapon",
  default: false,
});

export const assistState = atom<Skill | null>({
  key: "assist",
  default: null,
});

export const overrideAssistState = atom<boolean>({
  key: "overrideAssist",
  default: false,
});

export const specialState = atom<Skill | null>({
  key: "special",
  default: null,
});

export const overrideSpecialState = atom<boolean>({
  key: "overrideSpecial",
  default: false,
});

export const passiveAState = atom<Skill | null>({
  key: "passiveA",
  default: null,
});

export const overridePassiveAState = atom<boolean>({
  key: "overridePassiveA",
  default: false,
});

export const passiveBState = atom<Skill | null>({
  key: "passiveB",
  default: null,
});

export const overridePassiveBState = atom<boolean>({
  key: "overridePassiveB",
  default: false,
});

export const passiveCState = atom<Skill | null>({
  key: "passiveC",
  default: null,
});

export const overridePassiveCState = atom<boolean>({
  key: "overridePassiveC",
  default: false,
});

export const sacredSealState = atom<Skill | null>({
  key: "sacredSeal",
  default: null,
});
