const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const ProgramType = new GraphQLObjectType({
  name: "Program",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    exercises: { type: new GraphQLList(GraphQLID) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    sharedWith: { type: new GraphQLList(GraphQLID) },
  }),
});

module.exports = ProgramType;
