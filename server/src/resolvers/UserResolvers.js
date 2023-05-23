const UserResolvers = {
  Query: {
    user: async (_, { id }, { db }) => {
      return db.one('SELECT * FROM users WHERE id = $1', id);
    },
    users: async (_, __, { db }) => {
      return db.many('SELECT * FROM users');
    },
  },
};

module.exports = UserResolvers;
