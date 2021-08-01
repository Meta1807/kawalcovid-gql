const { createApplication } = require('graphql-modules');
const VaccinationsModule = require('./Vaccinations');

module.exports = createApplication({
  modules: [VaccinationsModule],
})
