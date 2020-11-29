import { gql, request } from "graphql-request";

import { Enumeration } from "types";

export const fetchElements = async (): Promise<Enumeration[]> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query FetchElements {
        enumerations {
          elements {
            displayValue
            name
            value
          }
        }
      }
    `
  );

  return data.enumerations.elements;
};
