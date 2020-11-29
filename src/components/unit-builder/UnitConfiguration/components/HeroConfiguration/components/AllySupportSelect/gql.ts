import { gql, request } from "graphql-request";

import { Enumeration } from "types";

export const fetchAllySupportRanks = async (): Promise<Enumeration[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchAllySupportRanks {
        enumerations {
          allySupportRanks {
            displayValue
            name
            value
          }
        }
      }
    `
  );

  return data.enumerations.allySupportRanks;
};
