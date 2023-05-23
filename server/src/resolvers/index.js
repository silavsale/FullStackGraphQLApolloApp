const userResolvers = require('./UserResolvers');
const mutationResolvers = require('./MutationResolvers');
const dispatchResolvers = require('./DispatchResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...dispatchResolvers.Query,
  },
  Mutation: {
    ...mutationResolvers.Mutation,
    ...dispatchResolvers.Mutation,
  },
};

module.exports = resolvers;
