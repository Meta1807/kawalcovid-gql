const { gql } = require('apollo-server');
const { createModule } = require('graphql-modules');
const fetch = require('node-fetch');

const statisticsResolvers = {
  Query: {
    getStatistics: async () => {
      const data = await fetch('https://dekontaminasi.com/api/id/covid19/stats').then((res) => res.json());
      return {
        ...data,
        timestamp: new Date(data.timestamp).toISOString(),
      };
    },
    getStatisticsByRegion: async (_, { region }) => {
      const data = await fetch('https://dekontaminasi.com/api/id/covid19/stats').then((res) => res.json());
      const regions = data.regions;
      return regions.find((item) => item.name === region);
    },
    getRegions: async () => {
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
        getStatistics: Statistics
        getStatisticsByRegion(region: String): StatisticsRegion
        getRegions: [String]
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

module.exports = statisticsModule;
