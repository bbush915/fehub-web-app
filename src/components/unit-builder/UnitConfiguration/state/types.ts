export type Hero = {
  id: string;
  name: string;
  title: string;
  releaseDate: string;
  artist: Artist;
  heroVoiceActors: HeroVoiceActor[];
  isLegendaryHero: boolean;
  isMythicHero: boolean;
  element: number;
  legendaryHeroBoostType: number;
  mythicHeroBoostType: number;
  isDuoHero: boolean;
  color: number;
  weapon: number;
  movementType: number;
  bvid: number;
  baseHitPoints: number;
  hitPointsGrowthRate: number;
  baseAttack: number;
  attackGrowthRate: number;
  baseSpeed: number;
  speedGrowthRate: number;
  baseDefense: number;
  defenseGrowthRate: number;
  baseResistance: number;
  resistanceGrowthRate: number;
  heroSkills: HeroSkill[];
};

export type Artist = {
  name: string;
  nameKanji: string | null;
  company: string | null;
};

export type HeroVoiceActor = {
  sort: number;
  voiceActor: VoiceActor;
};

type VoiceActor = {
  name: string;
};

type HeroSkill = {
  skill: Skill;
  unlockRarity: number;
};

export type Skill = {
  id: string;
  name: string;
  skillType: number;
  weaponRefineType: number | null;
  hitPointsModifier: number;
  attackModifier: number;
  speedModifier: number;
  defenseModifier: number;
  resistanceModifier: number;
};

export type StatisticValueContext = {
  hero: HeroValues;

  summonerSupportRank: number | null;

  rarity: number;
  level: number;
  merges: number;
  dragonflowers: number;

  asset: number | null;
  flaw: number | null;

  includeSkillBonuses: boolean;

  weapon: SkillValues | null;
  passiveA: SkillValues | null;
  sacredSeal: SkillValues | null;
};

type HeroValues = {
  bvid: number;
  baseHitPoints: number;
  hitPointsGrowthRate: number;
  baseAttack: number;
  attackGrowthRate: number;
  baseSpeed: number;
  speedGrowthRate: number;
  baseDefense: number;
  defenseGrowthRate: number;
  baseResistance: number;
  resistanceGrowthRate: number;
};

type SkillValues = {
  hitPointsModifier: number;
  attackModifier: number;
  speedModifier: number;
  defenseModifier: number;
  resistanceModifier: number;
};

export type StatisticValues = {
  hitPoints: number;
  attack: number;
  speed: number;
  defense: number;
  resistance: number;
};

export type HeroSkills = {
  weapon: Skill | null;
  assist: Skill | null;
  special: Skill | null;
  passiveA: Skill | null;
  passiveB: Skill | null;
  passiveC: Skill | null;
};
