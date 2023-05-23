const jwt = require('jsonwebtoken');

const MutationResolvers = {
  Mutation: {
    login: async (_, { username, password }, { db }) => {
      console.log('Mutation login:');
      console.log('username', username, password);
      const user = await db.one(
        'SELECT * FROM users WHERE username = $1',
        username
      );
      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, 'your-secret-key');

      return { token, user };
    },
    createUser: async (_, { username, password }, { db }) => {
      const newUser = await db.one(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
      );
      return newUser;
    },
  },
};

module.exports = MutationResolvers;
