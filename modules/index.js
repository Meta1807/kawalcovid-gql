import { createApplication } from 'graphql-modules';

import vaccinationsModule from './vaccinations';
import statisticsModule from './statistics';

export default createApplication({
  modules: [
    vaccinationsModule,
    statisticsModule
  ],
});
