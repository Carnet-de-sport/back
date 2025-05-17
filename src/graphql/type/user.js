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
    exercises: { type: GraphQLList(ExerciseType) },
    programs: { type: GraphQLList(ProgramType) },
    sharedWithMe: { type: new GraphQLList(GraphQLID) },
  }),
});

module.exports = UserType;
