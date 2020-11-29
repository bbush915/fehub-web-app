import { gql, request } from "graphql-request";

import { Enumeration } from "types";

export const fetchSummonerSupportRanks = async (): Promise<Enumeration[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchSummonerSupportRanks {
        enumerations {
          summonerSupportRanks {
            displayValue
            name
            value
          }
        }
      }
    `
  );

  return data.enumerations.summonerSupportRanks;
};
