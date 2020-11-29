import {
  AccessoryTypes,
  AllySupportRanks,
  Colors,
  Elements,
  FavoriteMarks,
  LegendaryHeroBoostTypes,
  MovementTypes,
  MythicHeroBoostTypes,
  Statistics,
  SummonerSupportRanks,
  WeaponRefineTypes,
  Weapons,
} from "types";

export type Message =
  | { type: "SET_ACCESSORY_TYPE"; value: AccessoryTypes }
  | { type: "SET_ALLY_SUPPORT_RANK"; value: AllySupportRanks }
  | { type: "SET_ARTIST"; value: string }
  | { type: "SET_ASSET"; value: Statistics }
  | { type: "SET_ASSIST"; value: { id: string | null; name: string } }
  | { type: "SET_ATTACK"; value: number }
  | { type: "SET_ATTACK_MODIFIER"; value: number }
  | { type: "SET_BLESSING"; value: Elements }
  | { type: "SET_DEFENSE"; value: number }
  | { type: "SET_DEFENSE_MODIFIER"; value: number }
  | { type: "SET_DRAGONFLOWERS"; value: number }
  | { type: "SET_DUO_HERO"; value: { isDuoHero: boolean } }
  | { type: "SET_FAVORITE_MARK"; value: FavoriteMarks }
  | { type: "SET_FLAW"; value: Statistics }
  | { type: "SET_HERO_ID"; value: string }
  | { type: "SET_HERO_MERIT"; value: number }
  | { type: "SET_HERO_NAME"; value: string }
  | { type: "SET_HERO_TITLE"; value: string }
  | { type: "SET_HIT_POINTS"; value: number }
  | { type: "SET_HIT_POINTS_MODIFIER"; value: number }
  | {
      type: "SET_LEGENDARY_HERO";
      value: { isLegendaryHero: boolean; element: Elements; legendaryHeroBoostType: LegendaryHeroBoostTypes };
    }
  | { type: "SET_LEVEL"; value: number }
  | { type: "SET_MERGES"; value: number }
  | { type: "SET_MOVEMENT_TYPE"; value: MovementTypes }
  | {
      type: "SET_MYTHIC_HERO";
      value: { isMythicHero: boolean; element: Elements; mythicHeroBoostType: MythicHeroBoostTypes };
    }
  | { type: "SET_PASSIVE_A"; value: { id: string | null; name: string } }
  | { type: "SET_PASSIVE_B"; value: { id: string | null; name: string } }
  | { type: "SET_PASSIVE_C"; value: { id: string | null; name: string } }
  | { type: "SET_RARITY"; value: number }
  | { type: "SET_RESISTANCE"; value: number }
  | { type: "SET_RESISTANCE_MODIFIER"; value: number }
  | { type: "SET_SACRED_SEAL"; value: { id: string | null; name: string } }
  | { type: "SET_SKILL_POINTS"; value: number }
  | { type: "SET_SPECIAL"; value: { id: string | null; name: string } }
  | { type: "SET_SPEED"; value: number }
  | { type: "SET_SPEED_MODIFIER"; value: number }
  | { type: "SET_SUMMONER_SUPPORT_RANK"; value: SummonerSupportRanks }
  | { type: "SET_TEMPLATE"; value: "default" }
  | { type: "SET_VOICE_ACTOR"; value: string }
  | { type: "SET_WEAPON"; value: { id: string | null; name: string; weaponRefineType: WeaponRefineTypes } }
  | { type: "SET_WEAPON_TYPE"; value: { color: Colors; weapon: Weapons } };

export type MessageTypes = Message["type"];
