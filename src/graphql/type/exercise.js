const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const ExerciseType = new GraphQLObjectType({
  name: "Exercise",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    muscles: { type: new GraphQLList(GraphQLString) },
    type: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    sharedWith: { type: new GraphQLList(GraphQLID) },
  }),
});

module.exports = { ExerciseType };
