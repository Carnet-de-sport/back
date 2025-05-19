const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const { UserType, AuthPayloadType } = require("./type/user");
const { ExerciseType } = require("./type/exercise");
const { ProgramType, ProgramExerciseInputType } = require("./type/program");

const userResolver = require("./resolvers/user.resolver");
const exerciseResolver = require("./resolvers/exercise.resolver");
const programResolver = require("./resolvers/program.resolver");
const { EXERCISE_TYPES, MUSCLE_GROUPS } = require("../models/exercise");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    myExercises: {
      type: new GraphQLList(ExerciseType),
      resolve: (parent, args, context) =>
        exerciseResolver.getExercises(args, context),
    },
    myPrograms: {
      type: new GraphQLList(ProgramType),
      resolve: (parent, args, context) =>
        programResolver.getPrograms(args, context),
    },
    exerciseTypes: {
      type: new GraphQLList(GraphQLString),
      resolve: () => EXERCISE_TYPES,
    },
    muscleGroups: {
      type: new GraphQLList(GraphQLString),
      resolve: () => MUSCLE_GROUPS,
    },
    userByUsername: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      resolve: (parent, { username }) =>
        userResolver.userByUsername({ username }),
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
      resolve: (parent, args, context) => userResolver.register(args, context),
    },
    login: {
      type: AuthPayloadType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (parent, args, context) => userResolver.login(args, context),
    },

    // EXERCISE CRUD
    addExercise: {
      type: ExerciseType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        muscles: { type: new GraphQLList(GraphQLString) },
        type: { type: GraphQLString },
      },
      resolve: (parent, args, context) =>
        exerciseResolver.addExercise(args, context),
    },
    updateExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        muscles: { type: new GraphQLList(GraphQLString) },
        type: { type: GraphQLString },
      },
      resolve: (parent, args, context) =>
        exerciseResolver.updateExercise(args, context),
    },
    deleteExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args, context) =>
        exerciseResolver.deleteExercise(args, context),
    },

    // PROGRAM CRUD
    addProgram: {
      type: ProgramType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        exercises: { type: new GraphQLList(ProgramExerciseInputType) },
      },
      resolve: (parent, args, context) =>
        programResolver.addProgram(args, context),
    },
    updateProgram: {
      type: ProgramType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        exercises: { type: new GraphQLList(ProgramExerciseInputType) },
      },
      resolve: (parent, args, context) =>
        programResolver.updateProgram(args, context),
    },
    deleteProgram: {
      type: ProgramType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args, context) =>
        programResolver.deleteProgram(args, context),
    },
    shareExercise: {
      type: ExerciseType,
      args: {
        exerciseId: { type: GraphQLID },
        usernameToShare: { type: GraphQLID },
      },
      resolve: (parent, args, context) =>
        exerciseResolver.shareExercise(args, context),
    },
    shareProgram: {
      type: ProgramType,
      args: {
        programId: { type: GraphQLID },
        usernameToShare: { type: GraphQLID },
      },
      resolve: (parent, args, context) =>
        programResolver.shareProgram(args, context),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
