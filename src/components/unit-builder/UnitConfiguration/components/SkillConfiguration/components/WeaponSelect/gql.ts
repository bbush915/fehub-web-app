import { gql, request } from "graphql-request";

import { Weapon } from "./types";

export const queryWeaponsByName = async (name: string): Promise<Weapon[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query QueryWeaponsByName($name: String!) {
        querySkillsByNameAndSkillType(name: $name, skillType: 1) {
          id
          groupName
          weaponRefineType
        }
      }
    `,
    { name }
  );

  return data.querySkillsByNameAndSkillType;
};
