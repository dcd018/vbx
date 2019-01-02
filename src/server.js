import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { graphql } from './config';
import { Query, Message, Mutation } from './resolvers';

const { apiTypeDefs, dbTypeDefs, secret, debug } = graphql;
export default new GraphQLServer({
  typeDefs: apiTypeDefs,
  resolvers: { Query, Message, Mutation },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: dbTypeDefs,
      endpoint: graphql.getEndpoint(),
      secret,
      debug
    })
  })
});