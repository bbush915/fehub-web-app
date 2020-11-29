import { gql, request } from "graphql-request";

import { Hero } from "../../../../state";

export const queryHeroesByName = async (
  name: string
): Promise<{ id: string; name: string; title: string; releaseDate: string }[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query QueryHeroesByName($name: String!) {
        queryHeroesByName(name: $name) {
          id
          name
          title
          releaseDate
        }
      }
    `,
    { name }
  );

  return data.queryHeroesByName;
};

export const fetchHeroById = async (id: string): Promise<Hero> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchHeroByID($id: Guid!) {
        hero(id: $id) {
          id
          name
          title
          releaseDate
          artist {
            name
            nameKanji
            company
          }
          heroVoiceActors(language: 1) {
            sort
            voiceActor {
              name
            }
          }
          isLegendaryHero
          isMythicHero
          element
          legendaryHeroBoostType
          mythicHeroBoostType
          isDuoHero
          color
          weapon
          movementType
          bvid
          baseHitPoints
          hitPointsGrowthRate
          baseAttack
          attackGrowthRate
          baseSpeed
          speedGrowthRate
          baseDefense
          defenseGrowthRate
          baseResistance
          resistanceGrowthRate
          heroSkills {
            skill {
              id
              name
              skillType
              weaponRefineType
              hitPointsModifier
              attackModifier
              speedModifier
              defenseModifier
              resistanceModifier
            }
            unlockRarity
          }
        }
      }
    `,
    { id }
  );

  return data.hero;
};
