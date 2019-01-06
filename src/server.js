import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { graphql } from './config';
import { default as typeDefs } from './typeDefs';
import { default as resolvers } from './resolvers';

const { typeDefs: generated, secret, debug } = graphql;
export default new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: generated,
      endpoint: graphql.getEndpoint(),
      secret,
      debug
    })
  })
});