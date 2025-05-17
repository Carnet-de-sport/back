const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const ProgramExerciseType = new GraphQLObjectType({
  name: "ProgramExercise",
  fields: () => ({
    exerciseId: { type: GraphQLID },
    reps: { type: GraphQLInt },
    sets: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
  }),
});

const ProgramType = new GraphQLObjectType({
  name: "Program",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    exercises: { type: new GraphQLList(ProgramExerciseType) }, // <--- important
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    sharedWith: { type: new GraphQLList(GraphQLID) },
  }),
});

const ProgramExerciseInputType = new GraphQLInputObjectType({
  name: "ProgramExerciseInput",
  fields: {
    exerciseId: { type: GraphQLID },
    reps: { type: GraphQLInt },
    sets: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
  },
});

module.exports = { ProgramType, ProgramExerciseType, ProgramExerciseInputType };
