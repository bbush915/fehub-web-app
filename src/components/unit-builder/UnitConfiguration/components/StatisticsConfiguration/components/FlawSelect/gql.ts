import { gql, request } from "graphql-request";

import { Enumeration } from "types";

export const fetchStatistics = async (): Promise<Enumeration[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchStatistics {
        enumerations {
          statistics {
            displayValue
            name
            value
          }
        }
      }
    `
  );

  return data.enumerations.statistics;
};
