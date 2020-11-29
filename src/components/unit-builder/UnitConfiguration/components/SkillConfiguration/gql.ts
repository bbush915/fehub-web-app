import { gql, request } from "graphql-request";

import { Skill } from "../../state";

export const querySkillsByNameAndSkillType = async (
  name: string,
  skillType: number
): Promise<{ id: string; name: string }[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query QuerySkillsByNameAndSkillType($name: String!, $skillType: Int!) {
        querySkillsByNameAndSkillType(name: $name, skillType: $skillType) {
          id
          name
        }
      }
    `,
    { name, skillType }
  );

  return data.querySkillsByNameAndSkillType;
};

export const fetchSkillById = async (id: string): Promise<Skill> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchSkillByID($id: Guid!) {
        skill(id: $id) {
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
      }
    `,
    { id }
  );

  return data.skill;
};
