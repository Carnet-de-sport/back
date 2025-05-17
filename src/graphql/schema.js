const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { UserType, AuthPayloadType } = require("./type/user");
const userResolver = require("./resolvers/user.resolver");

// On ajoutera ici les queries et mutations au fur et à mesure

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello World!",
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => userResolver.register(args),
    },
    login: {
      type: AuthPayloadType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => userResolver.login(args),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
