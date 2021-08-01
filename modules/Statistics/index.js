const { gql } = require('apollo-server');
const { createModule } = require('graphql-modules');
const fetch = require('node-fetch');

const statisticsResolvers = {
  Query: {
    getStatistics: async () => {
      const data = await fetch('https://dekontaminasi.com/api/id/covid19/stats').then((res) => res.json());
      return data;
    },
  },
}

const statisticsModule = createModule({
  id: 'statistics',
  dirname: __dirname,
  typeDefs: [
    gql`
      extend type Query {
        getStatistics: Statistics
      }
      type Statistics {
        numbers: StatisticsNumber
        timestamp: Float
        regions: StatisticsRegion
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
