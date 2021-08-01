const { createApplication } = require('graphql-modules');

const vaccinationsModule = require('./Vaccinations');
const statisticsModule = require('./Statistics');

module.exports = createApplication({
  modules: [vaccinationsModule, statisticsModule],
})
