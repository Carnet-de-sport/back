const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    exercises: { type: new GraphQLList(GraphQLID) }, // liste d’IDs d’exos
    programs: { type: new GraphQLList(GraphQLID) }, // liste d’IDs de programmes
    sharedWithMe: { type: new GraphQLList(GraphQLID) }, // liste d’IDs partagés
  }),
});

const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  fields: () => ({
    token: { type: GraphQLString },
  }),
});

module.exports = { UserType, AuthPayloadType };
