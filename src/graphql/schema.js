const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require("graphql");

const { UserType, AuthPayloadType } = require("./type/user");
const { ExerciseType } = require("./type/exercise");
const { ProgramType, ProgramExerciseInputType } = require("./type/program");

const userResolver = require("./resolvers/user.resolver");
const exerciseResolver = require("./resolvers/exercise.resolver");
const programResolver = require("./resolvers/program.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello World!",
    },

    myExercises: {
      type: new GraphQLList(ExerciseType),
      args: {
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => exerciseResolver.getExercises(args),
    },

    myPrograms: {
      type: new GraphQLList(ProgramType),
      args: {
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => programResolver.getPrograms(args),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // AUTH
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

    // EXERCISE CRUD
    addExercise: {
      type: ExerciseType,
      args: {
        userId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        muscles: { type: new GraphQLList(GraphQLString) },
        type: { type: GraphQLString },
      },
      resolve: async (parent, args) => exerciseResolver.addExercise(args),
    },
    updateExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        muscles: { type: new GraphQLList(GraphQLString) },
        type: { type: GraphQLString },
      },
      resolve: async (parent, args) => exerciseResolver.updateExercise(args),
    },
    deleteExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => exerciseResolver.deleteExercise(args),
    },
    shareExercise: {
      type: ExerciseType,
      args: {
        exerciseId: { type: GraphQLID },
        userIdToShare: { type: GraphQLID },
      },
      resolve: async (parent, args) => exerciseResolver.shareExercise(args),
    },

    // PROGRAM CRUD
    addProgram: {
      type: ProgramType,
      args: {
        userId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        exercises: { type: new GraphQLList(ProgramExerciseInputType) },
      },
      resolve: async (parent, args) => programResolver.addProgram(args),
    },
    updateProgram: {
      type: ProgramType,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        exercises: { type: new GraphQLList(ProgramExerciseInputType) },
      },
      resolve: async (parent, args) => programResolver.updateProgram(args),
    },
    deleteProgram: {
      type: ProgramType,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => programResolver.deleteProgram(args),
    },
    shareProgram: {
      type: ProgramType,
      args: {
        programId: { type: GraphQLID },
        userIdToShare: { type: GraphQLID },
      },
      resolve: async (parent, args) => programResolver.shareProgram(args),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
