const createContext = ({ req }) => {
  const token = req.headers.authorization || '';
  console.log('context token', token);
  const user = getUser(token);

  return { user };
};

module.exports = createContext;
