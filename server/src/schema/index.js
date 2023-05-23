const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User]
    userDispatches(userId: ID!): [Dispatch!]!
  }

  type Dispatch {
    id: ID!
    content: String!
    createdAt: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    dispatches: [Dispatch!]!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse
    createUser(username: String!, password: String!): User
    createDispatch(userId: ID!, content: String!): Dispatch!
  }
`;

module.exports = typeDefs;
