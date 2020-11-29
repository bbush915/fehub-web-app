import { selector } from "recoil";

import { SkillTypes } from "types";
import {
  assetState,
  dragonflowersState,
  flawState,
  heroState,
  includeSkillBonusesState,
  levelState,
  mergesState,
  passiveAState,
  rarityState,
  sacredSealState,
  summonerSupportRankState,
  weaponState,
} from "./atoms";
import { calculateHeroStatistics } from "./gql";
import { HeroSkills, Skill, StatisticValues } from "./types";

export const heroStatisticsState = selector<StatisticValues>({
  key: "heroStatistics",
  get: async ({ get }) => {
    const hero = get(heroState);
    const summonerSupportRank = get(summonerSupportRankState);
    const level = get(levelState);
    const rarity = get(rarityState);
    const merges = get(mergesState);
    const dragonflowers = get(dragonflowersState);
    const asset = get(assetState);
    const flaw = get(flawState);
    const includeSkillBonuses = get(includeSkillBonusesState);
    const weapon = get(weaponState);
    const passiveA = get(passiveAState);
    const sacredSeal = get(sacredSealState);

    if (!hero) {
      return {
        hitPoints: 0,
        attack: 0,
        speed: 0,
        defense: 0,
        resistance: 0,
      };
    }

    const statisticValues = await calculateHeroStatistics({
      hero: {
        bvid: hero.bvid,
        baseHitPoints: hero.baseHitPoints,
        hitPointsGrowthRate: hero.hitPointsGrowthRate,
        baseAttack: hero.baseAttack,
        attackGrowthRate: hero.attackGrowthRate,
        baseSpeed: hero.baseSpeed,
        speedGrowthRate: hero.speedGrowthRate,
        baseDefense: hero.baseDefense,
        defenseGrowthRate: hero.defenseGrowthRate,
        baseResistance: hero.baseResistance,
        resistanceGrowthRate: hero.resistanceGrowthRate,
      },

      summonerSupportRank: summonerSupportRank || null,

      rarity,
      level,
      merges,
      dragonflowers,

      asset: asset || null,
      flaw: flaw || null,

      includeSkillBonuses,
      weapon: weapon
        ? {
            hitPointsModifier: weapon.hitPointsModifier,
            attackModifier: weapon.attackModifier,
            speedModifier: weapon.speedModifier,
            defenseModifier: weapon.defenseModifier,
            resistanceModifier: weapon.resistanceModifier,
          }
        : null,
      passiveA: passiveA
        ? {
            hitPointsModifier: passiveA.hitPointsModifier,
            attackModifier: passiveA.attackModifier,
            speedModifier: passiveA.speedModifier,
            defenseModifier: passiveA.defenseModifier,
            resistanceModifier: passiveA.resistanceModifier,
          }
        : null,
      sacredSeal: sacredSeal
        ? {
            hitPointsModifier: sacredSeal.hitPointsModifier,
            attackModifier: sacredSeal.attackModifier,
            speedModifier: sacredSeal.speedModifier,
            defenseModifier: sacredSeal.defenseModifier,
            resistanceModifier: sacredSeal.resistanceModifier,
          }
        : null,
    });

    return statisticValues;
  },
});

export const heroSkillsState = selector<HeroSkills>({
  key: "heroSkills",
  get: ({ get }) => {
    const hero = get(heroState);
    const rarity = get(rarityState);

    if (!hero) {
      return {
        weapon: null,
        assist: null,
        special: null,
        passiveA: null,
        passiveB: null,
        passiveC: null,
      };
    }

    const skillTypeMap = hero.heroSkills
      .filter((x) => x.unlockRarity <= rarity)
      .sort((x, y) => y.unlockRarity - x.unlockRarity)
      .reduce<Partial<Record<SkillTypes, Skill>>>((skillTypeMap, heroSkill) => {
        const skillType = heroSkill.skill.skillType as SkillTypes;

        if (!skillTypeMap[skillType]) {
          skillTypeMap[skillType] = heroSkill.skill;
        }

        return skillTypeMap;
      }, {});

    return {
      weapon: skillTypeMap[SkillTypes.WEAPON] ?? null,
      assist: skillTypeMap[SkillTypes.ASSIST] ?? null,
      special: skillTypeMap[SkillTypes.SPECIAL] ?? null,
      passiveA: skillTypeMap[SkillTypes.PASSIVE_A] ?? null,
      passiveB: skillTypeMap[SkillTypes.PASSIVE_B] ?? null,
      passiveC: skillTypeMap[SkillTypes.PASSIVE_C] ?? null,
    };
  },
});
