export const graphql = {
  apiTypeDefs: `${__dirname}/schema.graphql`,
  dbTypeDefs: `${__dirname}/generated/prisma.graphql`,
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 4466,
  secret: process.env.SECRET,
  debug: process.env.DEBUG || true,
  getEndpoint: () => {
    const { protocol, host, port } = graphql;
    return `${protocol}://${host}:${port}`;
  }
}