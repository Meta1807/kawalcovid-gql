import { ApolloServer, gql } from 'apollo-server';
import application from './modules/index.js';

const schema = application.createSchemaForApollo();
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
