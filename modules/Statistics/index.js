import { gql } from 'apollo-server';
import { createModule } from 'graphql-modules';
import fetch from 'node-fetch';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const statisticsResolvers = {
  Query: {
    statistics: async () => {
      const data = await fetch('https://dekontaminasi.com/api/id/covid19/stats').then((res) => res.json());
      return {
        ...data,
        timestamp: new Date(data.timestamp).toISOString(),
      };
    },
    statisticsByRegion: async (_, { region }) => {
      const data = await fetch('https://dekontaminasi.com/api/id/covid19/stats').then((res) => res.json());
      const regions = data.regions;
      return regions.find((item) => item.name === region);
    },
    regions: async () => {
      const data = await fetch('https://dekontaminasi.com/api/id/covid19/stats').then((res) => res.json());
      const regions = data.regions;
      return regions.map((item) => item.name);
    }
  },
}

const statisticsModule = createModule({
  id: 'statistics',
  dirname: __dirname,
  typeDefs: [
    gql`
      extend type Query {
        statistics: Statistics
        statisticsByRegion(region: String): StatisticsRegion
        regions: [String]
      }
      type Statistics {
        numbers: StatisticsNumber
        timestamp: String
        regions: [StatisticsRegion]
      }
      type StatisticsNumber {
        fatal: Int
        infected: Int
        recovered: Int
      }
      type StatisticsRegion {
        name: String
        numbers: StatisticsNumber
      }
    `,
  ],
  resolvers: [statisticsResolvers]
});

export default statisticsModule;
