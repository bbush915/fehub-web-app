import { gql, request } from "graphql-request";

import { Enumeration } from "types";

export const fetchAccessoryTypes = async (): Promise<Enumeration[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchAccessoryTypes {
        enumerations {
          accessoryTypes {
            displayValue
            name
            value
          }
        }
      }
    `
  );

  return data.enumerations.accessoryTypes;
};
