const db = require('../database'); // adjust the path to match your file structure

const DispatchResolvers = {
  Query: {
    userDispatches: async (_, { userId }) => {
      try {
        let dispatches = await db.any(
          'SELECT * FROM dispatches WHERE user_id = $1',
          [userId]
        );
        dispatches = dispatches.map((dispatch) => {
          return {
            ...dispatch,
            createdAt: dispatch.created_at,
          };
        });
        return dispatches;
      } catch (error) {
        console.error('Error fetching dispatches:', error);
      }
    },
  },
  Mutation: {
    createDispatch: async (_, { userId, content }) => {
      try {
        let newDispatch = await db.one(
          'INSERT INTO dispatches(user_id, content, created_at) VALUES($1, $2, NOW()) RETURNING *',
          [userId, content]
        );
        newDispatch = {
          ...newDispatch,
          createdAt: newDispatch.created_at,
        };
        return newDispatch;
      } catch (error) {
        console.error('Error creating dispatch:', error);
      }
    },
  },
};

module.exports = DispatchResolvers;
