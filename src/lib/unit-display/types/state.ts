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

type State = {
  template: string | null;

  allySupportRank: AllySupportRanks;
  summonerSupportRank: SummonerSupportRanks;
  blessing: Elements;
  favoriteMark: FavoriteMarks;
  accessoryType: AccessoryTypes;

  hero: {
    id: string | null;
    name: string;
    title: string;
    artist: string;
    voiceActor: string;
    isLegendaryHero: boolean;
    isMythicHero: boolean;
    element: Elements;
    legendaryHeroBoostType: LegendaryHeroBoostTypes;
    mythicHeroBoostType: MythicHeroBoostTypes;
    isDuoHero: boolean;
    color: Colors;
    weapon: Weapons;
    movementType: MovementTypes;
  };

  statistics: {
    rarity: number;
    level: number;
    merges: number;
    dragonflowers: number;
    asset: Statistics;
    flaw: Statistics;
    hitPoints: number;
    hitPointsModifier: number;
    attack: number;
    attackModifier: number;
    speed: number;
    speedModifier: number;
    defense: number;
    defenseModifier: number;
    resistance: number;
    resistanceModifier: number;
    skillPoints: number;
    heroMerit: number;
  };

  skills: {
    weapon: {
      id: string | null;
      name: string;
      weaponRefineType: WeaponRefineTypes;
    };
    assist: {
      id: string | null;
      name: string;
    };
    special: {
      id: string | null;
      name: string;
    };
    passiveA: {
      id: string | null;
      name: string;
    };
    passiveB: {
      id: string | null;
      name: string;
    };
    passiveC: {
      id: string | null;
      name: string;
    };
    sacredSeal: {
      id: string | null;
      name: string;
    };
  };
};

export default State;
