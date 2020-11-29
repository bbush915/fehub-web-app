import { gql, request } from "graphql-request";

import { StatisticValueContext, StatisticValues } from "./types";

export const calculateHeroStatistics = async (
  statisticValueContext: StatisticValueContext
): Promise<StatisticValues> => {
  const data = await request(
    `${process.env.REACT_APP_API_URI}/graphql`,
    gql`
      query CalculateHeroStatistics($statisticValueContext: StatisticValueContext!) {
        calculateHeroStatistics(statisticValueContext: $statisticValueContext) {
          hitPoints
          attack
          speed
          defense
          resistance
        }
      }
    `,
    { statisticValueContext }
  );

  return data.calculateHeroStatistics;
};
