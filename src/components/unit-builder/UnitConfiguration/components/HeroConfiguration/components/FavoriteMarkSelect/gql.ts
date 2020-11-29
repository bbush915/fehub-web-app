import { gql, request } from "graphql-request";

import { Enumeration } from "types";

export const fetchFavoriteMarks = async (): Promise<Enumeration[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchFavoriteMarks {
        enumerations {
          favoriteMarks {
            displayValue
            name
            value
          }
        }
      }
    `
  );

  return data.enumerations.favoriteMarks;
};
